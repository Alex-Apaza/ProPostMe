"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Headerp from "@/componentes/Headerp";
import Crearpost from "@/componentes/Crearpost";
import EditorPerfil from "@/componentes/EditorPerfil";
import "./Perfil.css";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const Perfil = () => {
  const [usuario, setUsuario] = useState<any | null>(null);
  const [esMiPerfil, setEsMiPerfil] = useState(false);
  const [mostrarEditor, setMostrarEditor] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const cargarUsuario = async () => {
      const uidLocal = localStorage.getItem("usuarioId");
      const uidQuery = searchParams.get("uid");
      const uidFinal = uidQuery || uidLocal;

      if (!uidFinal) return;

      try {
        const docRef = doc(db, "usuarios", uidFinal);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          const datos = snapshot.data();
          setUsuario(datos);
          setEsMiPerfil(uidFinal === uidLocal);
        }
      } catch (err) {
        console.error("Error cargando el usuario:", err);
      }
    };

    cargarUsuario();
  }, [searchParams]);

  if (!usuario) {
    return (
      <div className="text-center mt-6 text-zinc-500">
        Perame bro estoy cargando tu perfil....
      </div>
    );
  }

  return (
    <>
      <Headerp />

      <div className="perfil-container">
        {/* Portada */}
        <div className="portada">
          <Image
            src={usuario.fotoPortada || "/default-portada.jpg"}
            alt="Portada"
            fill
            objectFit="cover"
          />
        </div>

        {/* Cabecera horizontal */}
        <div className="perfil-header">
          {/* Foto perfil */}
          <Image
            src={usuario.fotoPerfil || "/Perfil.png"}
            alt="Perfil"
            width={120}
            height={120}
            className="foto-perfil"
            objectFit="cover"
            onClick={() => {
              if (esMiPerfil && !usuario.fotoPerfil) {
                router.push("/seleccionar-foto");
              }
            }}
          />

          {/* Info usuario */}
          <div className="info-nombre">
            <h2>{usuario.nombre} {usuario.apellido}</h2>
            <p>{usuario.universidadNombre || "Universidad no registrada"}</p>
            <p>{usuario.carrera || "Carrera no especificada"}</p>
            <p>Fecha de nacimiento: {usuario.fecha_nacimiento}</p>

            {esMiPerfil && (
              <button
                onClick={() => setMostrarEditor(true)}
                className="btn-editar-perfil"
              >
                Editar perfil
              </button>
            )}
          </div>
        </div>

        {/* Descripción */}
        <div className="perfil-detalles">
          <h3>Acerca de mí</h3>
          <p>{usuario.descripcion || "Agrega una descripción personal."}</p>
        </div>

        {/* Crear post */}
        {esMiPerfil && (
          <div className="perfil-posts">
            <Crearpost />
          </div>
        )}
      </div>

      {/* Editor flotante */}
      {mostrarEditor && (
        <div className="editor-flotante-overlay">
          <div className="editor-flotante">
            <EditorPerfil />
            <button
              onClick={() => setMostrarEditor(false)}
              className="cerrar-editor absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Perfil;
