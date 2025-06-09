"use client";

import Headerp from "@/componentes/Headerp";
import Crearpost from "@/componentes/Crearpost";
import Cardpost from "@/componentes/Cardpost";
import Pantallitas from "@/componentes/Pantallitas";
import "./Feed.css";
import Cardrep from "@/componentes/Crearpostr";
import Link from "next/link"; // Importa Link para navegación interna

export default function Feed() {
  return (
    <>
      <div className="feed-container">
        {/* Carrusel a la izquierda */}

        {/* Posteos a la derecha */}
        <div className="posteos-col">
          {/* Botón atrás alineado a la derecha */}
          <div className="btn-atras-container">
            <Link href="/admin">
              <button className="btn-atras">Atrás</button>
            </Link>
          </div>

          <Crearpost />
          <Cardrep />
        </div>
      </div>
    </>
  );
}
