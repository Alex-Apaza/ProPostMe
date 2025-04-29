'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import "./Formregister.css";

interface Universidad {
  id: string;
  nombre: string;
  dominio: string;
}

const Formregister = () => {
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [universidades, setUniversidades] = useState<Universidad[]>([]);
  const [idUniversidad, setIdUniversidad] = useState<string>('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarUniversidades = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'universidades'));
        const array = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { nombre: string; dominio: string })
        }));
        setUniversidades(array);
      } catch (error) {
        console.error('Error cargando universidades:', error);
      }
    };
    cargarUniversidades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idUniversidad) {
      setMensaje('Selecciona una universidad');
      return;
    }

    const universidadSeleccionada = universidades.find(u => u.id === idUniversidad);
    if (!universidadSeleccionada) {
      setMensaje('Universidad inválida.');
      return;
    }

    if (!correo.endsWith(universidadSeleccionada.dominio)) {
      setMensaje(`El correo debe terminar en ${universidadSeleccionada.dominio}`);
      return;
    }

    try {
      await addDoc(collection(db, 'usuarios'), {
        nombre,
        apellido,
        correo_institucional: correo,
        contraseña,
        fecha_nacimiento: fechaNacimiento,
        universidadId: idUniversidad,
        creadoEn: new Date()
      });

      setMensaje('Registro exitoso, redirigiendo...');
      setTimeout(() => router.push('/loginsesion'), 2000);
    } catch (error) {
      console.error('Error registrando usuario:', error);
      setMensaje('Error en el registro');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Crea tu Cuenta</h2>
      {mensaje && <p className="text-center text-red-500 mb-4">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 rounded"
          required
        />
        
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="border p-2 rounded"
          required
        />
        
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
         <text>Fecha de nacimiento:</text>
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <select
          value={idUniversidad}
          onChange={(e) => setIdUniversidad(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Selecciona tu universidad</option>
          {universidades.map((uni) => (
            <option key={uni.id} value={uni.id}>
              {uni.nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">
          Registrarme
        </button>
      </form>
    </div>
  );
};

export default Formregister;
