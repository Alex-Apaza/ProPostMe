'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Headerp from '@/componentes/Headerp';
import '@/app/Perfil/Perfil.css';

const VistaPerfil = () => {
  const { uid } = useParams();
  const [usuario, setUsuario] = useState<any | null>(null);

  useEffect(() => {
    if (!uid) return;
    const obtener = async () => {
      const ref = doc(db, 'usuarios', uid as string);
      const snap = await getDoc(ref);
      if (snap.exists()) setUsuario(snap.data());
    };
    obtener();
  }, [uid]);

  if (!usuario) return <p className="text-center mt-6 text-zinc-500">Cargando perfil del usuario...</p>;

  return (
    <>
      <Headerp />
      <div className="perfil-container">
        <div className="portada">
          <Image
            src={usuario.fotoPortada || '/default-portada.jpg'}
            alt="Portada"
            fill
            objectFit="cover"
          />
        </div>
        <div className="perfil-header">
          <Image
            src={usuario.fotoPerfil || '/Perfil.png'}
            alt="Perfil"
            width={120}
            height={120}
            className="foto-perfil"
            objectFit="cover"
          />
          <div className="info-nombre">
            <h2>{usuario.nombre} {usuario.apellido}</h2>
            <p>{usuario.universidadNombre || "Universidad no registrada"}</p>
            <p>{usuario.carrera || "Carrera no especificada"}</p>
            <p>Fecha de nacimiento: {usuario.fecha_nacimiento || "No disponible"}</p>
          </div>
        </div>
        <div className="perfil-detalles">
          <h3>Acerca de mí</h3>
          <p>{usuario.descripcion || "Este usuario aún no ha agregado una descripción."}</p>
        </div>
      </div>
    </>
  );
};

export default VistaPerfil;
