"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ← IMPORTANTE para navegación
import "./style.css";
import Image from "next/image"; // Importamos el componente Image de Next.js
const Page = () => {
  const router = useRouter(); // ← Inicializamos el router

  return (
    <div className="contenedor">
      <header className="header">
        <div className="logo">
          <span className="logo-text">
            P<img src="/LOGO.svg" alt="Logo PostMe" className="logo-img" />
            <span>ST</span>- Me
          </span>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Buscar..." />
        </div>
        <div className="buttons">
          {/* Botón Regístrate */}
          <button className="btn" onClick={() => router.push("/Registropage")}>
            Regístrate
          </button>

          {/* Botón Iniciar Sesión */}
          <button className="btn" onClick={() => router.push("/loginsesion")}>
            Iniciar Sesión
          </button>
        </div>
      </header>

      <main className="main">
        <div className="start-section">
          <button className="start-btn">COMENZAR</button>
        </div>
        
          <div className="image-section">
            <Image
              className="letrapost"
              src="/Letrapost.png"
              alt="Logo"
              width={400}
              height={400}
            />
          </div>
          <img
            src="/inicio1.png"
            alt="Estatua con celular"
            className="main-image"
          />

          <div className="post-card">
            <div className="post-header">
              <img
                src="/logomini.png"
                alt="Logo pequeño"
                className="post-logo"
              />
              <span className="post-title">Post Me</span>
            </div>
            <p className="post-text">SOLO PARA....UNIVERSITARIOS XD</p>
            <div className="post-actions">
              <div className="action">
                <img src="/likemini.png" alt="Me gusta" className="icon" />
                <span>Me gusta</span>
              </div>
              <div className="action">
                <img src="/comnetmini.png" alt="Comentar" className="icon" />
                <span>Comentar</span>
              </div>
            </div>
          </div>
        
      </main>
    </div>
  );
};

export default Page;
