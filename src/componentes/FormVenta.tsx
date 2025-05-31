"use client";

import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Image from "next/image";
import QRCode from "react-qr-code";
import "./FormVenta.css";

interface Categoria {
  id: string;
  nombre: string;
}

const FormVenta = () => {
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estado, setEstado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [contactoTipo, setContactoTipo] = useState<"correo" | "telefono">(
    "correo"
  );
  const [contacto, setContacto] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarCategorias = async () => {
      const snapshot = await getDocs(collection(db, "categorias"));
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { nombre: string }),
      }));
      setCategorias(datos);
    };
    cargarCategorias();
  }, []);

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const subirACloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

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


  const handlePublicar = async () => {
    setError("");
    
    if (!titulo || !precio || !categoria || !estado || !contacto || !foto) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
      setError("No se encontró usuario. Por favor, vuelve a iniciar sesión.");
      return;
    }

    try {
  const fotoUrl = await subirACloudinary(foto);

await addDoc(collection(db, "postmarket"), {
  titulo,
  precio: parseFloat(precio),
  categoria,
  estado,
  descripcion,
  contacto,
  contactoTipo,
  usuarioId,
  fecha: new Date(),
  fotoUrl, // ✅ importante
});


  alert("✅ Producto publicado exitosamente");
  setTitulo("");
  setPrecio("");
  setCategoria("");
  setEstado("");
  setDescripcion("");
  setContacto("");
  setFoto(null);
  setPreview(null);
} catch (err) {
  setError("❌ Hubo un error al publicar. Intenta nuevamente.");
  console.error(err);
}

  };

  return (
    <div className="form-venta-container">
      {/* Formulario */}
      <div className="formulario">
        <h2>Publicar producto</h2>

        {error && <p className="error-msg">{error}</p>}

        <label>Título *</label>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título del producto"
        />

        <label>Precio *</label>
        <input
          type="number"
          value={precio}
          onChange={(e) => {
            const valor = parseFloat(e.target.value);
            if (valor >= 0 || e.target.value === "") {
              setPrecio(e.target.value);
            }
          }}
          placeholder="Bs."
          min={0}
        />

        <label>Categoría *</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Selecciona</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.nombre}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <label>Estado *</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Selecciona</option>
          <option>Nuevo</option>
          <option>Usado - Como nuevo</option>
          <option>Usado - Buen estado</option>
          <option>Usado - Aceptable</option>
        </select>

        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Detalles del producto..."
        />

        <label>Foto del producto *</label>
        <input type="file" accept="image/*" onChange={handleArchivo} />

        <label>Contacto *</label>
        <select
          value={contactoTipo}
          onChange={(e) => setContactoTipo(e.target.value as any)}
        >
          <option value="correo">Correo electrónico</option>
          <option value="telefono">Teléfono con QR</option>
        </select>
        <input
          value={contacto}
          onChange={(e) => setContacto(e.target.value)}
          placeholder="Correo o número"
        />

        <button onClick={handlePublicar} className="btn-publicar">
          Publicar producto
        </button>
      </div>

      {/* Vista previa */}
      <div className="vista-previa">
        <h3>Vista previa</h3>
        {preview && <img src={preview} alt="preview" className="preview-img" />}
        <h4>{titulo}</h4>
        <p className="precio">Bs. {precio}</p>
        <p className="estado">{estado}</p>
        <p className="descripcion">{descripcion}</p>
        {contactoTipo === "correo" && contacto && (
          <a href={`mailto:${contacto}`} className="contacto-link">
            {contacto}
          </a>
        )}
        {contactoTipo === "telefono" && contacto && (
          <QRCode value={contacto} size={100} />
        )}
      </div>
    </div>
  );
};

export default FormVenta;
