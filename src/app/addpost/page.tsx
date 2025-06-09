"use client";

import Headerp from "@/componentes/Headerp";
import Crearpost from "@/componentes/Crearpost";
import Cardpost from "@/componentes/Cardpost";
import Pantallitas from "@/componentes/Pantallitas";
import "./Feed.css";
import Cardrep from "@/componentes/Crearpostr";

export default function Feed() {
  return (
    <>
      
      <div className="feed-container">
        {/* Carrusel a la izquierda */}
       

        {/* Posteos a la derecha */}
        <div className="posteos-col">
          <Crearpost />
          <Cardrep />
        </div>
      </div>
    </>
  );
}
