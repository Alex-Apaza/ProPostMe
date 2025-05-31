"use client";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./Comentario.css"; 

interface Comentario {
  id: string;
  texto: string;
  usuarioId: string;
  fecha: Date;
}

interface Usuario {
  nombre: string;
  fotoPerfil?: string;
}

const Comentarios = ({ postId }: { postId: string }) => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [usuarios, setUsuarios] = useState<Record<string, Usuario>>({});
  const [nuevoComentario, setNuevoComentario] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comentarios"),
      orderBy("fecha", "asc")
    );

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const datos: Comentario[] = [];
      const nuevosUsuarios: Record<string, Usuario> = { ...usuarios };

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const comentario: Comentario = {
          id: docSnap.id,
          texto: data.texto,
          usuarioId: data.usuarioId,
          fecha: data.fecha?.toDate() || new Date(),
        };

        datos.push(comentario);

        // Cargar usuario si no está en cache
        if (comentario.usuarioId && !nuevosUsuarios[comentario.usuarioId]) {
          const usuarioSnap = await getDoc(
            doc(db, "usuarios", comentario.usuarioId)
          );
          if (usuarioSnap.exists()) {
            const u = usuarioSnap.data();
            nuevosUsuarios[comentario.usuarioId] = {
              nombre: u.nombre,
              fotoPerfil: u.fotoPerfil || "/Perfil.png",
            };
          }
        }
      }

      setComentarios(datos);
      setUsuarios(nuevosUsuarios);
    });

    return () => unsubscribe();
  }, [postId]);

  const enviarComentario = async () => {
    const usuarioId = localStorage.getItem("usuarioId") || "anonimo-demo";

    if (nuevoComentario.trim()) {
      await addDoc(collection(db, "posts", postId, "comentarios"), {
        texto: nuevoComentario,
        usuarioId,
        fecha: new Date(),
      });
      setNuevoComentario("");
    }
  };

  return (
    <div className="mt-2 px-4">
      {comentarios.map((c) => {
        const usuario = usuarios[c.usuarioId] || {
          nombre: "Anónimo",
          fotoPerfil: "/Perfil.png",
        };

        return (
          <div key={c.id} className="comentario">
            <img
              src={usuario.fotoPerfil}
              alt="avatar"
              className="comentario-avatar"
            />
            <div className="comentario-info">
              <p className="comentario-autor">{usuario.nombre}</p>
              <p className="comentario-texto">{c.texto}</p>
            </div>
          </div>
        );
      })}

      <div className="input-comentario">
        <input
          type="text"
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          placeholder="Escribe un comentario..."
        />
        <button onClick={enviarComentario}>Enviar</button>
      </div>
    </div>
  );
};

export default Comentarios;
