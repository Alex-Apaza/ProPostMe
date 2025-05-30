"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  addDoc,
  getCountFromServer,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import Comentario from "@/componentes/Comentario";
import "./Cardpost.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faComment,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

interface Post {
  id: string;
  contenido: string;
  mediaUrl: string;
  mediaTipo: string;
  fecha: Date;
  usuarioId: string;
  totalLikes: number;
  incognito?: boolean;
}

interface Usuario {
  nombre: string;
  apellido: string;
  fotoPerfil?: string;
}

const Cardpost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [usuarios, setUsuarios] = useState<Record<string, Usuario>>({});
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [comentariosAbiertos, setComentariosAbiertos] = useState<string | null>(
    null
  );
  const [ocultosActuales, setOcultosActuales] = useState<string[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("fecha", "desc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const tempPosts: Post[] = [];
      const tempUsuarios: Record<string, Usuario> = { ...usuarios };

      for (const docSnap of snapshot.docs) {
        const post = docSnap.data();
        const fecha = post.fecha?.toDate() || new Date();
        const likesSnapshot = await getCountFromServer(
          collection(db, "posts", docSnap.id, "likes")
        );
        const totalLikes = likesSnapshot.data().count || 0;

        tempPosts.push({
          id: docSnap.id,
          contenido: post.contenido,
          mediaUrl: post.mediaUrl,
          mediaTipo: post.mediaTipo,
          fecha,
          usuarioId: post.usuarioId || "desconocido",
          totalLikes,
          incognito: post.incognito || false,
        });

        const uid = post.usuarioId;
        if (uid && !tempUsuarios[uid]) {
          const usuarioSnap = await getDoc(doc(db, "usuarios", uid));
          if (usuarioSnap.exists()) {
            const userData = usuarioSnap.data();
            tempUsuarios[uid] = {
              nombre: userData.nombre,
              apellido: userData.apellido,
              fotoPerfil: userData.fotoPerfil || "",
            };
          }
        }
      }

      setPosts(tempPosts);
      setUsuarios(tempUsuarios);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const ocultos = JSON.parse(localStorage.getItem("postsOcultos") || "[]");
    setOcultosActuales(ocultos);
  }, []);

  const toggleMenu = (postId: string) => {
    setMenuAbierto(menuAbierto === postId ? null : postId);
  };

  const reportarPublicacion = async (
    postId: string,
    usuarioReportado: string
  ) => {
    const usuarioQueReporta = localStorage.getItem("usuarioId") || "anonimo";
    await addDoc(collection(db, "reportes_publicaciones"), {
      postId,
      usuarioReportado,
      usuarioQueReporta,
      motivo: "Contenido inapropiado",
      fecha: new Date(),
    });
    alert("Publicación reportada correctamente");
  };

  const ocultarPublicacion = (postId: string) => {
    const ocultos = JSON.parse(localStorage.getItem("postsOcultos") || "[]");
    localStorage.setItem("postsOcultos", JSON.stringify([...ocultos, postId]));
    setOcultosActuales((prev) => [...prev, postId]);
  };

  const deshacerOcultar = (postId: string) => {
    const ocultos = JSON.parse(localStorage.getItem("postsOcultos") || "[]");
    const actualizados = ocultos.filter((id: string) => id !== postId);
    localStorage.setItem("postsOcultos", JSON.stringify(actualizados));
    setOcultosActuales(actualizados);
  };

  const toggleLike = async (postId: string) => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;

    const likeRef = doc(db, "posts", postId, "likes", usuarioId);
    const likeSnap = await getDoc(likeRef);
    if (likeSnap.exists()) await deleteDoc(likeRef);
    else await setDoc(likeRef, { timestamp: new Date() });
  };

  const compartirPost = async (post: Post) => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return alert("Debes iniciar sesión para compartir.");

    await addDoc(collection(db, "posts"), {
      contenido: post.contenido,
      mediaUrl: post.mediaUrl,
      mediaTipo: post.mediaTipo,
      fecha: new Date(),
      usuarioId,
      postOriginalId: post.id,
      incognito: false,
    });

    alert("¡Publicación compartida!");
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {posts.map((post) => {
        const isIncognito = post.incognito === true;
        const usuario = isIncognito
          ? {
              nombre: "Usuario",
              apellido: "Incógnito",
              fotoPerfil: "/Perfilincognito.jpg",
            }
          : usuarios[post.usuarioId] || {
              nombre: "Usuario",
              apellido: "Anónimo",
              fotoPerfil: "/Perfil.png",
            };

        const tiempoRelativo = formatDistanceToNow(post.fecha, {
          addSuffix: true,
          locale: es,
        });

        if (ocultosActuales.includes(post.id)) {
          return (
            <div
              key={post.id}
              className="max-w-xl w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 p-4 rounded-lg shadow"
            >
              <p className="text-sm">Has ocultado esta publicación.</p>
              <button
                onClick={() => deshacerOcultar(post.id)}
                className="text-blue-600 hover:underline mt-2 text-sm"
              >
                Deshacer
              </button>
            </div>
          );
        }

        return (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-user">
                {usuario.fotoPerfil ? (
                  <img
                    src={usuario.fotoPerfil}
                    alt="avatar"
                    className="user-avatar"
                  />
                ) : (
                  <img src="/Perfil.png" alt="avatar" className="user-avatar" />
                )}

                <div>
                  <div className="user-nombre">
                    {usuario.nombre} {usuario.apellido}
                  </div>
                  <div className="user-fecha">{tiempoRelativo}</div>
                </div>
              </div>

              <div className="post-menu">
                <button
                  className="menu-btn"
                  onClick={() => toggleMenu(post.id)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor">
                    <path
                      d="M6 12h.01M12 12h.01M18 12h.01"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {menuAbierto === post.id && (
                  <div className="menu-opciones">
                    <ul>
                      <li
                        onClick={() =>
                          reportarPublicacion(post.id, post.usuarioId)
                        }
                      >
                        Reportar publicación
                      </li>
                      <li>Bloquear usuario</li>
                      <li onClick={() => ocultarPublicacion(post.id)}>
                        Ocultar publicación
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="post-content">
              <p className="post-text">{post.contenido}</p>

              {post.mediaUrl && (
                <div className="post-media">
                  {post.mediaTipo === "video" ? (
                    <video
                      src={post.mediaUrl}
                      controls
                      className="media-item"
                    />
                  ) : (
                    <img
                      src={post.mediaUrl}
                      alt="media"
                      className="media-item"
                    />
                  )}
                </div>
              )}

              <div className="post-acciones">
                <button onClick={() => toggleLike(post.id)}>
                  <FontAwesomeIcon icon={faThumbsUp} /> Me gusta{" "}
                  {post.totalLikes > 0 && <span>({post.totalLikes})</span>}
                </button>
                <button
                  onClick={() =>
                    setComentariosAbiertos(
                      post.id === comentariosAbiertos ? null : post.id
                    )
                  }
                >
                  <FontAwesomeIcon icon={faComment} /> Comentar
                </button>
                <button onClick={() => compartirPost(post)}>
                  <FontAwesomeIcon icon={faShare} /> Compartir
                </button>
              </div>

              {comentariosAbiertos === post.id && (
                <Comentario postId={post.id} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cardpost;
