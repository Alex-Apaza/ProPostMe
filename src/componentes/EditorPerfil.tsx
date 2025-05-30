"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

interface Props {
  onClose?: () => void;
}

const EditorPerfil = ({ onClose }: Props) => {
  const [usuario, setUsuario] = useState<any>(null);
  const [descripcion, setDescripcion] = useState('');
  const [carrera, setCarrera] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [fotoPortada, setFotoPortada] = useState('');
  const [previewPerfil, setPreviewPerfil] = useState<string | null>(null);
  const [previewPortada, setPreviewPortada] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const uid = typeof window !== 'undefined' ? localStorage.getItem('usuarioId') : null;

  useEffect(() => {
    const obtenerUsuario = async () => {
      if (!uid) return;
      const ref = doc(db, 'usuarios', uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setUsuario(data);
        setDescripcion(data.descripcion || '');
        setCarrera(data.carrera || '');
        setFotoPerfil(data.fotoPerfil || '');
        setFotoPortada(data.fotoPortada || '');
      }
    };
    obtenerUsuario();
  }, [uid]);

  const subirACloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    return data.secure_url;
  };

  const manejarEnvio = async () => {
    if (!uid) return;
    setCargando(true);

    const ref = doc(db, 'usuarios', uid);
    await updateDoc(ref, {
      descripcion,
      carrera,
      fotoPerfil,
      fotoPortada,
    });

    setMensaje('Perfil actualizado correctamente 🎉');
    setCargando(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8 space-y-4 p-4 border rounded shadow bg-white dark:bg-zinc-800">
      <h2 className="text-xl font-bold mb-2">Editar Perfil</h2>

      <label className="block font-semibold text-sm">¿Qué estudias?</label>
      <input
        type="text"
        value={carrera}
        onChange={(e) => setCarrera(e.target.value)}
        placeholder="Carrera"
        className="w-full p-2 border rounded"
      />

      <label className="block font-semibold text-sm mt-2">Cuenta más de ti:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción personal"
        rows={3}
        className="w-full p-2 border rounded"
      />

      <div>
        <label className="block font-semibold text-sm">Foto de Perfil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              setPreviewPerfil(URL.createObjectURL(file));
              const url = await subirACloudinary(file);
              setFotoPerfil(url);
            }
          }}
        />
        {previewPerfil && <img src={previewPerfil} alt="Perfil Preview" className="w-20 h-20 rounded-full mt-2" />}
      </div>

      <div>
        <label className="block font-semibold text-sm">Foto de Portada:</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              setPreviewPortada(URL.createObjectURL(file));
              const url = await subirACloudinary(file);
              setFotoPortada(url);
            }
          }}
        />
        {previewPortada && <img src={previewPortada} alt="Portada Preview" className="w-full h-32 object-cover mt-2" />}
      </div>

      <button
        onClick={manejarEnvio}
        disabled={cargando}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
      >
        {cargando ? 'Guardando...' : 'Guardar Cambios'}
      </button>

      <button
        onClick={onClose}
        className="mt-2 w-full py-2 px-4 bg-gray-300 text-black rounded hover:bg-gray-400"
      >
        Cancelar
      </button>

      {mensaje && <p className="text-green-500 text-sm mt-1">{mensaje}</p>}
    </div>
  );
};

export default EditorPerfil;
