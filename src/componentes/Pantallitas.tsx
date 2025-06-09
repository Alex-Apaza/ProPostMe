"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./Pantallitas.css";

const bloques = [
  {
    titulo: "Personaliza tu perfil",
    descripcion: "Mejora tu información y estilo para que todos te conozcan mejor.",
    imagen: "/esqselfi.png",
    boton: "Comenzar",
    destino: "/Perfil",
  },
  {
    titulo: "Comparte tus mejores momentos",
    descripcion: "Publica recuerdos únicos con tus amigos en tu muro.",
    imagen: "/esqgrupi-Photoroom.png",
    boton: "Ir al Feed",
    destino: "/Feed",
  },
  {
    titulo: "Modo incógnito activado",
    descripcion: "Chismea sin que te descubran. Prueba el modo incógnito ;) ",
    imagen: "/esqincognito.png",
    boton: "Probar",
    destino: "Feed",
  },
  {
    titulo: "Vende lo que no usas",
    descripcion: "UniMarket te conecta con compañeros para intercambiar lo que ya no necesitas.",
    imagen: "/esqmarket.png",
    boton: "Conocer UniMarket",
    destino: "/Unimarket",
  },
];

const Pantallitas = () => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bloques.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const actual = bloques[index];

  return (
    <div className="pantallita-container">
      <h3 className="pantallita-titulo">{actual.titulo}</h3>
      <Image
        src={actual.imagen}
        alt={actual.titulo}
        width={260}
        height={150}
        className="pantallita-img"
      />
      <p className="pantallita-desc">{actual.descripcion}</p>
      <button
        className="pantallita-btn"
        onClick={() => router.push(actual.destino)}
      >
        {actual.boton}
      </button>
    </div>
  );
};

export default Pantallitas;
