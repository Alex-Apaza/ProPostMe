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
            <div className="tooltip">
              <a href="#">Equipo</a>
              <span className="tooltiptext">
                Conoce al grupo de aficionados que estan detrás de esta
                plataforma pensada por y para ti.
                <li>Alex Apaza Nina</li>
                <li>Sebastian Sumi Bolivar</li>
                <li>Rodrigo Aguilar Sandoval</li>
              </span>
            </div>
            <div className="tooltip">
              <a href="#">Sobre Nosotros</a>
              <span className="tooltiptext">
                PostMe es una plataforma creada por y para estudiantes
                universitarios. Desarrollada por el grupo Suicideboys, nuestro
                objetivo es facilitar la conexión, el intercambio de ideas y la
                compraventa segura entre alumnos. Creemos en el poder de la
                comunidad estudiantil y trabajamos para potenciarla cada día.
              </span>
            </div>
            <div className="tooltip">
              <a href="#">Terminos y Condiciones</a>
              <span className="tooltiptext">
                Al usar este servicio, aceptas nuestras reglas. No permitimos
                usos indebidos, contenido ofensivo ni actividades ilegales.
                Podemos cambiar estos términos cuando sea necesario.
              </span>
            </div>
            <div className="tooltip">
              <a href="#">Contacto</a>
              <span className="tooltiptext">
                Escríbenos o llámanos para más información.
                <li>76227643</li>
                <li>71996745</li>
                <li>72871395</li>
              </span>
            </div>
          </nav>
          <div className="footer-icons">
            <a href="https://www.facebook.com/sebastian.bolivar.56614/about">
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
