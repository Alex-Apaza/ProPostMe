"use client";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import "./Formregister.css";

interface Universidad {
  id: string;
  nombre: string;
  dominio: string;
}

const Formregister = () => {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [universidades, setUniversidades] = useState<Universidad[]>([]);
  const [idUniversidad, setIdUniversidad] = useState<string>("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarUniversidades = async () => {
      try {
        const snapshot = await getDocs(collection(db, "universidades"));
        const array = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as { nombre: string; dominio: string }),
        }));
        setUniversidades(array);
      } catch (error) {
        console.error("Error cargando universidades:", error);
      }
    };
    cargarUniversidades();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idUniversidad) {
      setMensaje("Selecciona una universidad");
      return;
    }

    const universidadSeleccionada = universidades.find(
      (u) => u.id === idUniversidad
    );
    if (!universidadSeleccionada) {
      setMensaje("Universidad inválida.");
      return;
    }

    if (!correo.endsWith(universidadSeleccionada.dominio)) {
      setMensaje(
        `El correo debe terminar en ${universidadSeleccionada.dominio}`
      );
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre,
        apellido,
        correo_institucional: correo,
        contraseña,
        fecha_nacimiento: fechaNacimiento,
        universidadId: idUniversidad,
        universidadNombre: universidadSeleccionada.nombre, // ⬅️ esto es clave
        creadoEn: new Date(),
        fotoPerfil: "",
        fotoPortada: "",
        carrera: "",
        descripcion: "",
      });

      // Guardamos el ID generado por Firestore
      const usuarioId = docRef.id;

      // Puedes almacenarlo temporalmente
      localStorage.setItem("usuarioId", usuarioId);

      setMensaje("Registro exitoso, redirigiendo...");
      setTimeout(() => router.push("/loginsesion"), 2000);
    } catch (error) {
      console.error("Error registrando usuario:", error);
      setMensaje("Error en el registro");
    }
  };

  return (
    <div className="formregister-container">
      <h2 className="formregister-title">Crea tu cuenta</h2>
      <p className="formregister-subtitle">
        Completa todos los datos personales para comenzar
      </p>

      {mensaje && <p className="formregister-mensaje">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="formregister-form">
        <input
          type="text"
          placeholder="Nombre*"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="formregister-input"
          required
        />

        <input
          type="text"
          placeholder="Apellido*"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="formregister-input"
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico universitario*"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="formregister-input"
          required
        />

        <input
          type="password"
          placeholder="Contraseña*"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="formregister-input"
          required
        />
        <label className="formregister-label">Fecha de nacimiento:</label>
        <input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          className="formregister-input"
          required
        />

        <select
          value={idUniversidad}
          onChange={(e) => setIdUniversidad(e.target.value)}
          className="formregister-input"
          required
        >
          <option value="">Selecciona tu universidad*</option>
          {universidades.map((uni) => (
            <option key={uni.id} value={uni.id}>
              {uni.nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="formregister-button">
          Registrarme
        </button>
      </form>

      <p className="formregister-loginlink">
        ¿Ya tienes una cuenta? <a href="/loginsesion">Inicia sesión</a>
      </p>
    </div>
  );
};

export default Formregister;
