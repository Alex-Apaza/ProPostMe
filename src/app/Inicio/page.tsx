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
            <span>ST</span>-Me
          </span>
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
            <img src="/logomini.png" alt="Logo pequeño" className="post-logo" />
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
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PostMe</h3>
            <p>Conectando universitarios desde 2025.</p>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>Email: contacto@postme.com</p>
            <p>Teléfono: +591 70000000</p>
          </div>
          <div className="footer-section">
            <h4>Síguenos</h4>
            <p>Instagram | Twitter | TikTok</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PostMe. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
