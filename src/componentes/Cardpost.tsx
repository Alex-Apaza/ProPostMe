'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
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
} from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Comentario from '@/componentes/Comentario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare } from '@fortawesome/free-solid-svg-icons';

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

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('fecha', 'desc'));
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const tempPosts: Post[] = [];
      const tempUsuarios: Record<string, Usuario> = { ...usuarios };

      for (const docSnap of snapshot.docs) {
        const post = docSnap.data();
        const fecha = post.fecha?.toDate() || new Date();
        const likesSnapshot = await getCountFromServer(collection(db, 'posts', docSnap.id, 'likes'));
        const totalLikes = likesSnapshot.data().count || 0;

        tempPosts.push({
          id: docSnap.id,
          contenido: post.contenido,
          mediaUrl: post.mediaUrl,
          mediaTipo: post.mediaTipo,
          fecha,
          usuarioId: post.usuarioId || 'desconocido',
          totalLikes,
          incognito: post.incognito || false,
        });

        const uid = post.usuarioId;
        if (uid && !tempUsuarios[uid]) {
          const usuarioSnap = await getDoc(doc(db, 'usuarios', uid));
          if (usuarioSnap.exists()) {
            const userData = usuarioSnap.data();
            tempUsuarios[uid] = {
              nombre: userData.nombre,
              apellido: userData.apellido,
              fotoPerfil: userData.fotoPerfil || '',
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
    const ocultos = JSON.parse(localStorage.getItem('postsOcultos') || '[]');
    setOcultosActuales(ocultos);
  }, []);

  const toggleLike = async (postId: string) => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) return;

    const likeRef = doc(db, 'posts', postId, 'likes', usuarioId);
    const likeSnap = await getDoc(likeRef);
    if (likeSnap.exists()) await deleteDoc(likeRef);
    else await setDoc(likeRef, { timestamp: new Date() });
  };

  const compartirPost = async (post: Post) => {
    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) return alert('Debes iniciar sesión para compartir.');

    await addDoc(collection(db, 'posts'), {
      contenido: post.contenido,
      mediaUrl: post.mediaUrl,
      mediaTipo: post.mediaTipo,
      fecha: new Date(),
      usuarioId,
      postOriginalId: post.id,
      incognito: false,
    });

    alert('¡Publicación compartida!');
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-4 w-full">
      {posts.map((post) => {
        const isIncognito = post.incognito === true;
        const usuario = isIncognito
          ? { nombre: 'Usuario', apellido: 'Incógnito', fotoPerfil: '/Perfilincognito.jpg' }
          : usuarios[post.usuarioId] || {
              nombre: 'Usuario',
              apellido: 'Anónimo',
              fotoPerfil: '/Perfil.png',
            };

        const tiempoRelativo = formatDistanceToNow(post.fecha, {
          addSuffix: true,
          locale: es,
        });

        return (
          <div
            key={post.id}
            className="max-w-xl w-full bg-white border border-[#4EDCD8] rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
          >
            {/* Header */}
            <div className="flex justify-between items-start p-4">
              <div className="flex gap-3 items-center">
                {usuario.fotoPerfil ? (
                  <img
                    src={usuario.fotoPerfil || '/Perfil.png'}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="font-semibold text-zinc-800">
                    {usuario.nombre} {usuario.apellido}
                  </p>
                  <p className="text-xs text-zinc-500">{tiempoRelativo}</p>
                </div>
              </div>
              <button
                className="text-zinc-400 hover:text-zinc-800 font-bold"
                onClick={() => setMenuAbierto(menuAbierto === post.id ? null : post.id)}
              >
                ...
              </button>
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
                <button onClick={() => toggleLike(post.id)} className="flex items-center gap-1 hover:text-[#4EDCD8]">
                  <FontAwesomeIcon icon={faThumbsUp} /> Me gusta {post.totalLikes > 0 && <span>({post.totalLikes})</span>}
                </button>
                <button
                  onClick={() =>
                    setComentariosAbiertos(post.id === comentariosAbiertos ? null : post.id)
                  }
                  className="flex items-center gap-1 hover:text-[#4EDCD8]"
                >
                  <FontAwesomeIcon icon={faComment} /> Comentar
                </button>
                <button
                  onClick={() => compartirPost(post)}
                  className="flex items-center gap-1 hover:text-[#4EDCD8]"
                >
                  <FontAwesomeIcon icon={faShare} /> Compartir
                </button>
              </div>

              {/* Comentarios */}
              {comentariosAbiertos === post.id && <Comentario postId={post.id} />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cardpost;
