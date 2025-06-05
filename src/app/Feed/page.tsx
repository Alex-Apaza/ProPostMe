"use client";

import Headerp from "@/componentes/Headerp";
import Crearpost from "@/componentes/Crearpost";
import Cardpost from "@/componentes/Cardpost";
import Pantallitas from "@/componentes/Pantallitas";
import "./Feed.css";

export default function Feed() {
  return (
    <>
      <Headerp />
      <div className="feed-container">
        {/* Carrusel a la izquierda */}
        <div className="pantallitas-col">
          <Pantallitas />
        </div>

        {/* Posteos a la derecha */}
        <div className="posteos-col">
          <Crearpost />
          <Cardpost />
        </div>
      </div>
    </>
  );
}
