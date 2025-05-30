'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Menulateral.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faCartShopping,
  faUser,
  faRightFromBracket,
  faXmark,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

const Menulateral = () => {
  const [abierto, setAbierto] = useState(false);

  const toggleMenu = () => setAbierto(!abierto);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioId');
    window.location.href = '/loginsesion';
  };

  return (
    <>
      <button className="menu-lateral-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {abierto && (
        <div className="menu-lateral-overlay" onClick={toggleMenu}>
          <div className="menu-lateral" onClick={(e) => e.stopPropagation()}>
            <h2 className="menu-titulo">Menú</h2>

            <nav className="menu-links">
              <Link href="/Feed" className="menu-link">
                <FontAwesomeIcon icon={faHouse} className="icono" /> Inicio
              </Link>
              <Link href="/Unimarket" className="menu-link">
                <FontAwesomeIcon icon={faCartShopping} className="icono" /> UniMarket
              </Link>
              <Link href="/Perfil" className="menu-link">
                <FontAwesomeIcon icon={faUser} className="icono" /> Perfil
              </Link>
            </nav>

            <div className="menu-bottom">
              <button onClick={cerrarSesion} className="cerrar-sesion">
                <FontAwesomeIcon icon={faRightFromBracket} className="icono" /> Cerrar sesión
              </button>

              <button onClick={toggleMenu} className="cerrar-menu">
                <FontAwesomeIcon icon={faXmark} className="icono" /> Cerrar menú
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Menulateral;
