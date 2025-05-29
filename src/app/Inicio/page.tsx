"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "./style.css";
import Image from "next/image"; // Importamos el componente Image de Next.js

const Page = () => {
  const router = useRouter(); // ← Inicializamos el router

  return (
    <div className="contenedor">
      <header className="header">
        <div className="logo">
          <span className="logo-text">
            <img
              className="logoimagen"
              src="/Letrapost.png"
              alt="Logo PostMe"
            />
          </span>
        </div>

        <div className="buttons">
          <button className="btn" onClick={() => router.push("/Registropage")}>
            Regístrate
          </button>
          <button className="btn" onClick={() => router.push("/loginsesion")}>
            Iniciar Sesión
          </button>
        </div>
      </header>

      <main className="main">
        <div className="image-section">
          <Image
            className="letrapost"
            src="/Letrapost.png"
            alt="Logo"
            width={400}
            height={400}
          />
        </div>
        <div className="start-section-text">
          <p className="inicio-descripcion">
            La Plataforma exclusiva para estudiantes universitarios. <br />
            Comparte, conecta y compra/vende con otros estudiantes.
          </p>
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

      <footer className="footer-nuevo">
        <div className="footer-top">
          <nav className="footer-nav">
            <a href="#">Blog</a>
            <a href="#">Equipo</a>
            <a href="#">Sobre Nosotros</a>
            <a href="#">Testimonios</a>
            <a href="#">Contacto</a>
          </nav>
          <div className="footer-icons">
            <a href="">
              <img src="/Logofacebook.png" alt="Facebook" />
            </a>
            <a href="https://wa.link/ai9e07">
              <img src="/Logowhats.png" alt="Instagram" />
            </a>
          </div>
          <div className="footer-info">
            <p className="footer-title">Estamos en La Paz, Bolivia</p>
            <p className="footer-sub">
              Conectamos estudiantes de todo el país. ¡Únete ahora!
            </p>
            <div className="footer-contact">
              <p>
                <b>Email:</b> contacto@postme.com
              </p>
              <p>
                <b>Tel:</b> +591 76227643
              </p>
              <p>
                <b>Dirección:</b> Campus EMI, Av. Rafael Pabon, La Paz, Bolivia
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <img src="/Letrapost.png" alt="Logo" className="footer-logo" />
          <p>&copy; 2025 PostMe. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Page;
