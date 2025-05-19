'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MenuLateral from './Menulateral';
import './Headerp.css';

const Headerp = () => {
  const router = useRouter();
  const [mostrarMenuPerfil, setMostrarMenuPerfil] = useState(false);

  const handleCerrarSesion = () => {
    localStorage.removeItem('usuarioId');
    setMostrarMenuPerfil(false);
    router.push('/');
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/">
          <Image
            src="/Letrapost.png"
            alt="Logo"
            width={60}
            height={55}
            className="logo"
            onClick={() => router.refresh()}
          />
        </Link>

        <button className="search-button">
          <Image src="/Lupa.png" width={24} height={24} alt="Buscar" />
        </button>
      </div>

      <nav className="nav-icons">
        <button onClick={() => router.refresh()} className="nav-item">
          <Image src="/Inicio.png" width={24} height={24} alt="Inicio" />
          <span className="nav-label">Inicio</span>
        </button>
        <Link href="/marketplace" className="nav-item">
          <Image src="/Market.png" width={24} height={24} alt="Marketplace" />
          <span className="nav-label">UniMarket</span>
        </Link>
        <Link href="/Perfil" className="nav-item">
          <Image src="/Usuario.png" width={24} height={24} alt="Perfil" />
          <span className="nav-label">Perfil</span>
        </Link>
      </nav>

      <div className="header-right">
        <MenuLateral />
        <div className="relative">
          <Image
            src="/Perfil.png"
            alt="Perfil usuario"
            width={36}
            height={36}
            className="perfil-pic cursor-pointer"
            onClick={() => setMostrarMenuPerfil(!mostrarMenuPerfil)}
          />
          {mostrarMenuPerfil && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded shadow z-50 text-sm">
              <button
                onClick={() => {
                  setMostrarMenuPerfil(false);
                  router.push('/Perfil');
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Ver perfil
              </button>
              <button
                onClick={handleCerrarSesion}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Headerp;
