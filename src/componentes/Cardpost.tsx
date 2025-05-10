"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  addDoc,
} from "firebase/firestore";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { getCountFromServer } from "firebase/firestore";

interface Post {
  id: string;
  contenido: string;
  mediaUrl: string;
  mediaTipo: string;
  fecha: Date;
  usuarioId: string;
  totalLikes: number;
}

interface Usuario {
  nombre: string;
  apellido: string;
  fotoPerfil?: string;
}

const Cardpost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [usuarios, setUsuarios] = useState<Record<string, Usuario>>({});

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("fecha", "desc"));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const tempPosts: Post[] = [];
      const tempUsuarios: Record<string, Usuario> = { ...usuarios }; // mantenemos cache

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

    return () => unsubscribe(); // limpiamos listener al desmontar
  }, []);
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);

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

  const reportarUsuario = async (usuarioReportado: string) => {
    const usuarioQueReporta = localStorage.getItem("usuarioId") || "anonimo";

    await addDoc(collection(db, "reportes_usuarios"), {
      usuarioReportado,
      usuarioQueReporta,
      motivo: "Comportamiento ofensivo",
      fecha: new Date(),
    });

    alert("Usuario reportado correctamente");
  };

  // OCULTAR PUBLICACION
  const ocultarPublicacion = (postId: string) => {
    const ocultos = JSON.parse(localStorage.getItem("postsOcultos") || "[]");
    localStorage.setItem("postsOcultos", JSON.stringify([...ocultos, postId]));
    setOcultosActuales((prev) => [...prev, postId]);
  };
  const [ocultosActuales, setOcultosActuales] = useState<string[]>([]);

  useEffect(() => {
    const ocultos = JSON.parse(localStorage.getItem("postsOcultos") || "[]");
    setOcultosActuales(ocultos);
  }, []);
  const deshacerOcultar = (postId: string) => {
    const ocultos = JSON.parse(localStorage.getItem("postsOcultos") || "[]");
    const actualizados = ocultos.filter((id: string) => id !== postId);
    localStorage.setItem("postsOcultos", JSON.stringify(actualizados));
    setOcultosActuales(actualizados);
  };

  // LIKE PUBLICACION
  const toggleLike = async (postId: string) => {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;

    const likeRef = doc(db, "posts", postId, "likes", usuarioId);
    const likeSnap = await getDoc(likeRef);

    if (likeSnap.exists()) {
      await deleteDoc(likeRef); // quitar like
    } else {
      await setDoc(likeRef, { timestamp: new Date() }); // dar like
    }
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {posts.map((post) => {
        const usuario = usuarios[post.usuarioId] || {
          nombre: "Usuario",
          apellido: "Anónimo",
          fotoPerfil: "",
        };

        const tiempoRelativo = formatDistanceToNow(post.fecha, {
          addSuffix: true,
          locale: es,
        });
        // Si está oculto, mostrar la tarjeta reducida
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
          <div
            key={post.id}
            className="max-w-xl w-full rounded-lg bg-white dark:bg-zinc-900 shadow-md overflow-hidden"
          >
            {/* Encabezado */}
            <div className="flex items-center justify-between p-4 relative">
              <div className="flex items-center gap-3">
                <img
                  src={usuario.fotoPerfil || "/Perfil.png"}
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-zinc-900 dark:text-white">
                    {usuario.nombre} {usuario.apellido}
                  </div>
                  <div className="text-sm text-zinc-500">{tiempoRelativo}</div>
                </div>
              </div>

              {/* Botón de opciones */}
              <div className="relative">
                <button
                  className="w-8 h-8 flex items-center justify-center text-zinc-500 hover:text-zinc-700"
                  onClick={() => toggleMenu(post.id)} // función que controlaremos
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
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10">
                    <ul className="text-sm text-zinc-700">
                      <li
                        className="px-4 py-2 hover:bg-zinc-100 cursor-pointer"
                        onClick={() =>
                          reportarPublicacion(post.id, post.usuarioId)
                        }
                      >
                        Reportar publicación
                      </li>

                      <li className="px-4 py-2 hover:bg-zinc-100 cursor-pointer">
                        Bloquear usuario
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-zinc-100 cursor-pointer"
                        onClick={() => ocultarPublicacion(post.id)}
                      >
                        Ocultar publicación
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Contenido */}
            <div className="px-4 pb-4">
              <p className="mb-4 text-zinc-800 dark:text-zinc-100">
                {post.contenido}
              </p>

              {post.mediaUrl && (
                <div className="w-full aspect-[4/3] rounded-md overflow-hidden mb-4">
                  {post.mediaTipo === "video" ? (
                    <video
                      src={post.mediaUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={post.mediaUrl}
                      alt="media"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              )}

              {/* Acciones */}
              <div className="flex justify-around text-sm text-zinc-600 dark:text-zinc-300 border-t pt-3">
                <button
                  className="flex items-center gap-2 hover:text-blue-500 text-white"
                  onClick={() => toggleLike(post.id)}
                >
                  👍 Me gusta{" "}
                  {post.totalLikes > 0 && <span>({post.totalLikes})</span>}
                </button>

                <button className="flex items-center gap-2 hover:text-blue-500">
                  💬 Comentar
                </button>
                <button className="flex items-center gap-2 hover:text-blue-500">
                  🔁 Compartir
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cardpost;
