'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection, query, orderBy, onSnapshot, getDoc, doc,
  addDoc, deleteDoc, setDoc, getCountFromServer
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Comentario from '@/componentes/Comentario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare, faFlag, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
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
  const [comentariosAbiertos, setComentariosAbiertos] = useState<string | null>(null);
  const [ocultosActuales, setOcultosActuales] = useState<string[]>([]);
  const [likesUsuario, setLikesUsuario] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const usuarioActual = typeof window !== 'undefined' ? localStorage.getItem('usuarioId') : null;

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('fecha', 'desc'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const tempPosts: Post[] = [];
      const tempUsuarios: Record<string, Usuario> = { ...usuarios };
      const tempLikes: Record<string, boolean> = {};

      for (const docSnap of snapshot.docs) {
        const post = docSnap.data();
        const fecha = post.fecha?.toDate() || new Date();
        const postId = docSnap.id;
        const likesSnapshot = await getCountFromServer(collection(db, 'posts', postId, 'likes'));

        // ¿Ya le dio like?
        if (usuarioActual) {
          const likeRef = doc(db, 'posts', postId, 'likes', usuarioActual);
          const likeSnap = await getDoc(likeRef);
          tempLikes[postId] = likeSnap.exists();
        }

        tempPosts.push({
          id: postId,
          contenido: post.contenido,
          mediaUrl: post.mediaUrl,
          mediaTipo: post.mediaTipo,
          fecha,
          usuarioId: post.usuarioId || 'desconocido',
          totalLikes: likesSnapshot.data().count || 0,
          incognito: post.incognito || false,
        });

        if (post.usuarioId && !tempUsuarios[post.usuarioId]) {
          const userSnap = await getDoc(doc(db, 'usuarios', post.usuarioId));
          if (userSnap.exists()) {
            const data = userSnap.data();
            tempUsuarios[post.usuarioId] = {
              nombre: data.nombre,
              apellido: data.apellido,
              fotoPerfil: data.fotoPerfil || '',
            };
          }
        }
      }

      setPosts(tempPosts);
      setUsuarios(tempUsuarios);
      setLikesUsuario(tempLikes);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const ocultos = JSON.parse(localStorage.getItem('postsOcultos') || '[]');
    setOcultosActuales(ocultos);
  }, []);

  const toggleLike = async (postId: string) => {
    if (!usuarioActual) return;
    const likeRef = doc(db, 'posts', postId, 'likes', usuarioActual);
    const likeSnap = await getDoc(likeRef);

    if (likeSnap.exists()) {
      await deleteDoc(likeRef);
    } else {
      await setDoc(likeRef, { timestamp: new Date() });
    }
  };

  const compartirPost = async (post: Post) => {
    if (!usuarioActual) return alert('Debes iniciar sesión para compartir.');
    await addDoc(collection(db, 'posts'), {
      contenido: post.contenido,
      mediaUrl: post.mediaUrl,
      mediaTipo: post.mediaTipo,
      fecha: new Date(),
      usuarioId: usuarioActual,
      postOriginalId: post.id,
      incognito: false,
    });
    alert('¡Publicación compartida!');
  };

  const ocultarPublicacion = (postId: string) => {
    const nuevos = [...ocultosActuales, postId];
    localStorage.setItem('postsOcultos', JSON.stringify(nuevos));
    setOcultosActuales(nuevos);
  };

  const deshacerOcultar = (postId: string) => {
    const nuevos = ocultosActuales.filter(id => id !== postId);
    localStorage.setItem('postsOcultos', JSON.stringify(nuevos));
    setOcultosActuales(nuevos);
  };

  const reportarPublicacion = async (postId: string, usuarioReportado: string) => {
    if (!usuarioActual) return;
    await addDoc(collection(db, 'reportes_publicaciones'), {
      postId,
      usuarioReportado,
      usuarioQueReporta: usuarioActual,
      motivo: 'Contenido inapropiado',
      fecha: new Date(),
    });
    alert('Publicación reportada.');
  };

  const irAlPerfil = (usuarioId: string) => {
    if (!usuarioActual) return;
    if (usuarioId === usuarioActual) router.push('/Perfil');
    else router.push(`/Vistaperfil/${usuarioId}`);
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-4 w-full">
      {posts.map(post => {
        const usuario = post.incognito
          ? { nombre: 'Usuario', apellido: 'Incógnito', fotoPerfil: '/Perfilincognito.jpg' }
          : usuarios[post.usuarioId] || { nombre: 'Usuario', apellido: 'Anónimo', fotoPerfil: '/Perfil.png' };

        const tiempoRelativo = formatDistanceToNow(post.fecha, { addSuffix: true, locale: es });

        if (ocultosActuales.includes(post.id)) {
          return (
            <div key={post.id} className="w-full max-w-xl bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg shadow text-sm text-zinc-700">
              <p>Publicación oculta.</p>
              <button onClick={() => deshacerOcultar(post.id)} className="text-blue-500 hover:underline mt-2">Anular</button>
            </div>
          );
        }

        return (
          <div key={post.id} className="max-w-xl w-full bg-white border border-[#4EDCD8] rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
            {/* Encabezado */}
            <div className="flex justify-between items-start p-4">
              <div className="flex gap-3 items-center cursor-pointer" onClick={() => irAlPerfil(post.usuarioId)}>
                <img src={usuario.fotoPerfil || '/Perfil.png'} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-zinc-800">{usuario.nombre} {usuario.apellido}</p>
                  <p className="text-xs text-zinc-500">{tiempoRelativo}</p>
                </div>
              </div>
              <button
                className="text-zinc-400 hover:text-zinc-800 font-bold"
                onClick={() => setMenuAbierto(menuAbierto === post.id ? null : post.id)}
              >...</button>
              {menuAbierto === post.id && (
                <div className="absolute bg-white border shadow-md right-4 mt-10 rounded-md z-50 text-sm">
                  <ul className="py-2 px-3 space-y-2">
                    <li className="cursor-pointer hover:text-red-500" onClick={() => reportarPublicacion(post.id, post.usuarioId)}>
                      <FontAwesomeIcon icon={faFlag} /> Reportar publicación
                    </li>
                    <li className="cursor-pointer hover:text-red-500" onClick={() => alert('Pendiente: bloqueo')}>
                      🚫 Bloquear usuario
                    </li>
                    <li className="cursor-pointer hover:text-zinc-600" onClick={() => ocultarPublicacion(post.id)}>
                      <FontAwesomeIcon icon={faEyeSlash} /> Ocultar publicación
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="px-4 pb-4">
              <p className="text-zinc-800 mb-4">{post.contenido}</p>
              {post.mediaUrl && (
                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-zinc-200">
                  {post.mediaTipo === 'video' ? (
                    <video src={post.mediaUrl} controls className="w-full h-full object-cover" />
                  ) : (
                    <img src={post.mediaUrl} alt="media" className="w-full h-full object-cover" />
                  )}
                </div>
              )}

              {/* Acciones */}
              <div className="flex justify-around border-t pt-3 text-sm text-zinc-600">
                <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1 ${likesUsuario[post.id] ? 'text-[#4EDCD8]' : 'hover:text-[#4EDCD8]'}`}>
                  <FontAwesomeIcon icon={faThumbsUp} /> Me gusta {post.totalLikes > 0 && <span>({post.totalLikes})</span>}
                </button>
                <button onClick={() => setComentariosAbiertos(post.id === comentariosAbiertos ? null : post.id)} className="flex items-center gap-1 hover:text-[#4EDCD8]">
                  <FontAwesomeIcon icon={faComment} /> Comentar
                </button>
                <button onClick={() => compartirPost(post)} className="flex items-center gap-1 hover:text-[#4EDCD8]">
                  <FontAwesomeIcon icon={faShare} /> Compartir
                </button>
              </div>

              {comentariosAbiertos === post.id && <Comentario postId={post.id} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cardpost;
