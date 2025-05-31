'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './Crearpost.css';
import { db } from '@/lib/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

const Crearpost = () => {
  const [contenido, setContenido] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const [usuario, setUsuario] = useState<any>(null);
const [modoIncognito, setModoIncognito] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      const usuarioId = localStorage.getItem('usuarioId');
      if (!usuarioId) return;

      const ref = doc(db, 'usuarios', usuarioId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setUsuario(snap.data());
      }
    };

    fetchUsuario();
  }, []);

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivo(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePost = async () => {
    if (!contenido.trim() && !archivo) {
      setMensaje('Escribe algo o sube un archivo.');
      return;
    }

    setCargando(true);
    try {
      let mediaUrl = '';
      let tipo = '';

      if (archivo) {
        const formData = new FormData();
        formData.append('file', archivo);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        mediaUrl = data.secure_url;
        tipo = data.resource_type;
      }

      await addDoc(collection(db, 'posts'), {
        contenido,
        mediaUrl,
        mediaTipo: tipo,
      incognito: modoIncognito,
        fecha: new Date(),
        usuarioId: localStorage.getItem('usuarioId') || 'anonimo-demo',
      });

      setMensaje('¡Publicado!');
      setContenido('');
      setArchivo(null);
      setPreview(null);
    } catch (error) {
      console.error('Error al crear el post:', error);
      setMensaje('Error al publicar');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className='blockcrear'>
      <div className='llenado'>
        <Image
          className='Fotoperfil'
          src={usuario?.fotoPerfil || '/Perfil.png'}
          width={30}
          height={30}
          alt='Foto perfil'
        />
        <input
          type='text'
          placeholder='¿En qué estás pensando?'
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className='queinput h-[30px] text-sm text-[#9e9e9e] font-[Roboto-Regular] placeholder:text-[#9e9e9e]'
        />
      </div>

      

      {preview && (
        <div className='preview mt-2'>
          {archivo?.type.startsWith('video') ? (
            <video src={preview} controls width={250} />
          ) : (
            <img src={preview} alt='Vista previa' width={250} />
          )}
        </div>
      )}

      <div className="multincog">
        <label className="boton-post-opcion cursor-pointer">
          <Image src="/multi.png" width={20} height={20} alt="Multimedia" />
          <span>Foto/Video</span>
          <input type="file" accept="image/*,video/*" onChange={handleArchivo} hidden />
        </label>

        <div
  className={`boton-post-opcion cursor-pointer ${modoIncognito ? 'activo' : ''}`}
  onClick={() => setModoIncognito(!modoIncognito)}
>
  <Image src="/incognito.png" width={20} height={20} alt="Incógnito" />
  <span>{modoIncognito ? 'Incógnito activado' : 'Incógnito'}</span>
</div>

      </div>

      <div className='publicar-btn mt-2'>
        <button
          onClick={handlePost}
          disabled={cargando}
          className='bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700'
        >
          {cargando ? 'Publicando...' : 'Publicar'}
        </button>
      </div>

      {mensaje && <p className='text-sm text-green-600 mt-1'>{mensaje}</p>}
    </div>
  );
};

export default Crearpost;
