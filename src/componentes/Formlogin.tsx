"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Formlogin.css";

const Formlogin = () => {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!correo || !contraseña) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    try {
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("correo_institucional", "==", correo));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMensaje("Correo no registrado.");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (userData.contraseña !== contraseña) {
        setMensaje("Contraseña incorrecta.");
        return;
      }

      setMensaje("Inicio de sesión exitoso. Redirigiendo...");
      setTimeout(() => router.push("/Feed"), 2000);
    } catch (error) {
      console.error("Error durante el login:", error);
      setMensaje("Error en el servidor.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">¡Bienvenido de nuevo!</h2>
      <p className="login-subtitle">
        Inicia sesión para continuar con tu experiencia universitaria
      </p>
      {mensaje && <p className="login-message">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">Correo electrónico</label>
        <input
          type="email"
          placeholder="tu.correo@universidad.edu"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="login-input"
          required
        />

        <label className="login-label">Contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="login-input"
          required
        />

        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>
      <p className="login-register">
        ¿No tienes una cuenta?{" "}
        <span
          onClick={() => router.push("/Registropage")}
          className="login-link"
        >
          Regístrate aquí
        </span>
      </p>
    </div>
  );
};

export default Formlogin;
