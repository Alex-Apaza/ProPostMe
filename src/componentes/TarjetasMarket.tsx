// componentes/TarjetasMarket.tsx
"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import "./TarjetasMarket.css";
import Link from 'next/link';
interface Props {
  filtros: {
    categoria: string;
    precioMax: number;
  };
}

interface Producto {
  id: string;
  titulo: string;
  precio: number;
  categoria: string;
  estado: string;
  descripcion: string;
  contacto: string;
  contactoTipo: string;
  fotoUrl: string;
  usuarioId: string;
  fecha: any;
  usuario?: {
    nombre: string;
    fotoPerfil?: string;
  };
}

const TarjetasMarket: React.FC<Props> = ({ filtros }) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const snapshot = await getDocs(collection(db, "postmarket"));
      const productosConUsuarios: Producto[] = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data() as Producto;
        const usuarioRef = doc(db, "usuarios", data.usuarioId);
        const usuarioSnap = await getDoc(usuarioRef);

        const usuarioData = usuarioSnap.exists()
          ? usuarioSnap.data()
          : { nombre: "Anónimo" };

        productosConUsuarios.push({
          ...data,
          id: docSnap.id,
          usuario: {
            nombre: usuarioData.nombre,
            fotoPerfil: usuarioData.fotoPerfil,
          },
        });
      }

      setProductos(productosConUsuarios);
    };

    obtenerDatos();
  }, []);

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      filtros.categoria === "Todos" || p.categoria === filtros.categoria;
    const coincidePrecio = p.precio <= filtros.precioMax;
    return coincideCategoria && coincidePrecio;
  });

  return (
    <div className="grid-tarjetas">
      {productosFiltrados.map((p) => (
        <div key={p.id} className="tarjeta">
          <span className="etiqueta-estado">{p.estado}</span>
          <img
            src={p.fotoUrl || "/default.jpg"}
            alt="Producto"
            className="img-producto"
          />
          <div className="contenido">
            <div className="titulo-precio">
              <h3>{p.titulo}</h3>
              <span className="precio">Bs. {p.precio.toFixed(2)}</span>
            </div>
            <p className="descripcion">{p.descripcion.slice(0, 90)}...</p>
            <p className="info-extra">
              Publicado: {new Date(p.fecha.seconds * 1000).toLocaleDateString()}
            </p>
            <div className="vendedor">
              <Image
                src={p.usuario?.fotoPerfil || "/Perfil.png"}
                alt="Usuario"
                width={24}
                height={24}
                className="foto-usuario"
              />
              <span>{p.usuario?.nombre || "Sin nombre"}</span>
              
              <Link href={`/Infopost/${p.id}`} className="btn-contactar">
                Ver Inf.
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TarjetasMarket;
