"use client";

import React from "react";
import Formregister from "@/componentes/Formregister";
import Image from "next/image";
import "./registro.css";

const page = () => {
  return (
    <div className="flex-container">
      {/* Sección informativa */}
      <div className="info-registro">
        <Image
          className="logo-campus"
          src="/Letrapost.png"
          width={300}
          height={300}
          alt="Logo"
        />
        <h2 className="titulo-campus">Únete a la comunidad universitaria</h2>
        <p className="texto-campus">
          Crea tu cuenta en PostMe y conecta con otros estudiantes, comparte recursos
          y accede al marketplace exclusivo.
        </p>
        <ul className="lista-campus">
          <li>1️⃣ Crea tu cuenta con tu correo institucional</li>
          <li>2️⃣ Completa tu perfil académico</li>
          <li>3️⃣ ¡Empieza a compartir con tu comunidad!</li>
        </ul>
        <p className="footer-campus">© 2025 PostMe - Todos los derechos reservados</p>
      </div>

      {/* Formulario */}
      <div className="blokeregistro">
        <Formregister />
      </div>
    </div>
  );
};

export default page;
