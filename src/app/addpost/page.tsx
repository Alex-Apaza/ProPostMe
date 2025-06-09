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
       

        <div className="posteos-col">
          <div className="btn-atras-container">
            <Link href="/admin" className="btn-vender">
              Volver al Panel
            </Link>
          </div>

          <Crearpost />
          <Cardrep />
        </div>
      </div>
    </>
  );
}
