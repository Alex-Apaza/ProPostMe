"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "./EditorPerfil.css";

interface Props {
  onClose?: () => void;
}

const EditorPerfil = ({ onClose }: Props) => {
  const [usuario, setUsuario] = useState<any>(null);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [carrera, setCarrera] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [fotoPortada, setFotoPortada] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [previewPerfil, setPreviewPerfil] = useState<string | null>(null);
  const [previewPortada, setPreviewPortada] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const uid =
    typeof window !== "undefined" ? localStorage.getItem("usuarioId") : null;

  useEffect(() => {
    const obtenerUsuario = async () => {
      if (!uid) return;
      const ref = doc(db, "usuarios", uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setUsuario(data);
        setNombre(data.nombre || "");
        setApellido(data.apellido || "");
        setDescripcion(data.descripcion || "");
        setCarrera(data.carrera || "");
        setFotoPerfil(data.fotoPerfil || "");
        setFotoPortada(data.fotoPortada || "");
      }
    };
    obtenerUsuario();
  }, [uid]);

  const subirACloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  const manejarEnvio = async () => {
    if (!uid) return;
    setCargando(true);

    if (password && password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden ❌");
      setCargando(false);
      return;
    }

    const ref = doc(db, "usuarios", uid);
    const datosActualizados: any = {
      nombre,
      apellido,
      descripcion,
      carrera,
    };
    if (fotoPerfil !== undefined && fotoPerfil !== "") {
      datosActualizados.fotoPerfil = fotoPerfil;
    }

    if (fotoPortada !== undefined && fotoPortada !== "") {
      datosActualizados.fotoPortada = fotoPortada;
    }

    if (previewPerfil) {
      datosActualizados.fotoPerfil = fotoPerfil;
    }

    if (previewPortada) {
      datosActualizados.fotoPortada = fotoPortada;
    }

    if (password) {
      datosActualizados["contraseña"] = password;
    }

    await updateDoc(ref, datosActualizados);

    setMensaje("✅ Perfil actualizado correctamente");
    setCargando(false);
    window.location.reload();
  };

  return (
    <div className="editor-perfil-container">
      <h2>Editar Perfil</h2>

      <label>Nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Tu nombre"
      />

      <label>Apellido:</label>
      <input
        type="text"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        placeholder="Tu apellido"
      />

      <label>Carrera:</label>
      <input
        type="text"
        value={carrera}
        onChange={(e) => setCarrera(e.target.value)}
        placeholder="Carrera"
      />

      <label>Acerca de ti:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción personal"
        rows={3}
      />

      <label>Nueva contraseña:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <label>Confirmar contraseña:</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="••••••••"
      />

      <label>Foto de Perfil:</label>
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
      {previewPerfil && (
        <img src={previewPerfil} alt="Preview" className="img-preview perfil" />
      )}

      <label>Foto de Portada:</label>
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
      {previewPortada && (
        <img
          src={previewPortada}
          alt="Portada Preview"
          className="img-preview portada"
        />
      )}

      <button onClick={manejarEnvio} disabled={cargando} className="guardar">
        {cargando ? "Guardando..." : "Guardar Cambios"}
      </button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default EditorPerfil;
