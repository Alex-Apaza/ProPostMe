'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Menulateral.css';

const Menulateral = () => {
  const [abierto, setAbierto] = useState(false);

  const toggleMenu = () => setAbierto(!abierto);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioId');
    window.location.href = '/loginsesion'; // redirige a login
  };

  return (
    <>
      <button className="menu-lateral-toggle" onClick={toggleMenu}>
        <Image src="/Menu.png" alt="Menú" width={24} height={24} />
      </button>

      {abierto && (
        <div className="menu-lateral-overlay" onClick={toggleMenu}>
          <div className="menu-lateral" onClick={(e) => e.stopPropagation()}>
            <h2 className="menu-titulo">Menú</h2>
            <nav className="menu-links">
              <Link href="/" className="menu-link">Inicio</Link>
              <Link href="/marketplace" className="menu-link">UniMarket</Link>
              <Link href="/perfil" className="menu-link">Perfil</Link>
              <Link href="/notificaciones" className="menu-link">Notificaciones</Link>
              <Link href="/ajustes" className="menu-link">Ajustes</Link>
            </nav>

            {/* 🔴 Cerrar sesión al final */}
            <button onClick={cerrarSesion} className="cerrar-sesion">
              Cerrar sesión
            </button>

            <button onClick={toggleMenu} className="cerrar-menu">Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Menulateral;
