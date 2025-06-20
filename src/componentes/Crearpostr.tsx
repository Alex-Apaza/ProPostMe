'use client'; 

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  setDoc,
  getCountFromServer,
  where,
  getDocs,
  limit,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Comentario from '@/componentes/Comentario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare, faFlag, faEyeSlash, faTrash } from '@fortawesome/free-solid-svg-icons';

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

const Cardrep = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [usuarios, setUsuarios] = useState<Record<string, Usuario>>({});
  const [menuAbierto, setMenuAbierto] = useState<string | null>(null);
  const [comentariosAbiertos, setComentariosAbiertos] = useState<string | null>(null);
  const [ocultosActuales, setOcultosActuales] = useState<string[]>([]);
  const [likesUsuario, setLikesUsuario] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const usuarioActual = typeof window !== 'undefined' ? localStorage.getItem('usuarioId') : null;

  useEffect(() => {
    const cargarPostsFiltrados = async () => {
      const reportesSnapshot = await getDocs(collection(db, 'reportes_publicaciones'));
      const postIdsReportados = reportesSnapshot.docs.map(doc => doc.data().postId).filter(Boolean);

      if (postIdsReportados.length === 0) {
        setPosts([]);
        return;
      }

      const batches: string[][] = [];
      for (let i = 0; i < postIdsReportados.length; i += 10) {
        batches.push(postIdsReportados.slice(i, i + 10));
      }

      const tempPosts: Post[] = [];
      const tempUsuarios: Record<string, Usuario> = {};
      const tempLikes: Record<string, boolean> = {};

      for (const batch of batches) {
        const postsQuery = query(
          collection(db, 'posts'),
          where('__name__', 'in', batch),
          orderBy('fecha', 'desc')
        );

        const postsSnapshot = await getDocs(postsQuery);

        for (const docSnap of postsSnapshot.docs) {
          const post = docSnap.data();
          const fecha = post.fecha?.toDate() || new Date();
          const postId = docSnap.id;
          const likesSnapshot = await getCountFromServer(collection(db, 'posts', postId, 'likes'));

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
      }

      setPosts(tempPosts);
      setUsuarios(tempUsuarios);
      setLikesUsuario(tempLikes);
    };

    cargarPostsFiltrados();
  }, [usuarioActual]);

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

  const eliminarPublicacion = async (postId: string) => {
    if (!confirm('¿Estás seguro de eliminar esta publicación?')) return;

    try {
      await deleteDoc(doc(db, 'posts', postId));
      await deleteDoc(doc(db, 'reportes_publicaciones', postId));
      setPosts(prev => prev.filter(p => p.id !== postId));
      alert('Publicación eliminada correctamente.');
    } catch (error) {
      console.error('Error eliminando publicación:', error);
      alert('Ocurrió un error al eliminar la publicación.');
    }
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
            <div className="flex justify-between items-start p-4 relative">
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
                <div className="absolute bg-black border shadow-md right-4 mt-10 rounded-md z-50 text-sm text-white">
                  <ul className="py-2 px-3 space-y-2">
                    <li className="cursor-pointer hover:text-red-500" onClick={() => eliminarPublicacion(post.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Eliminar publicación
                    </li>
                    <li className="cursor-pointer hover:text-red-500" onClick={() => alert('Pendiente: bloqueo')}>
                      🚫 Bloquear usuario
                    </li>
                    <li className="cursor-pointer hover:text-zinc-400" onClick={() => ocultarPublicacion(post.id)}>
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
                <button onClick={() => setComentariosAbiertos(post.id === comentariosAbiertos ? null : post.id)} className="hover:text-[#4EDCD8]">
                  <FontAwesomeIcon icon={faComment} /> Comentar
                </button>
                <button onClick={() => compartirPost(post)} className="hover:text-[#4EDCD8]">
                  <FontAwesomeIcon icon={faShare} /> Compartir
                </button>
              </div>

              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cardrep;
