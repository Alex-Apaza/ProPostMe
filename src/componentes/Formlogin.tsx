'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Formlogin = () => {
  const router = useRouter();

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo || !contraseña) {
      setMensaje('Todos los campos son obligatorios.');
      return;
    }

    try {
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('correo_institucional', '==', correo));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMensaje('Correo no registrado.');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.contraseña !== contraseña) {
        setMensaje('Contraseña incorrecta.');
        return;
      }

      // Login exitoso
      setMensaje('Inicio de sesión exitoso. Redirigiendo...');
      setTimeout(() => router.push('/Feed'), 2000);  // aquí redirige a page.tsx o página principal
    } catch (error) {
      console.error('Error durante el login:', error);
      setMensaje('Error en el servidor.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      {mensaje && <p className="text-center text-red-500 mb-4">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="email"
          placeholder="Correo institucional"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="border p-2 rounded"
          required
        />
        
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Formlogin;
