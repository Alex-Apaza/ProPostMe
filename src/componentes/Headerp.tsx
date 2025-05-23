"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import MenuLateral from "./Menulateral";
import "./Headerp.css";

const Headerp = () => {
  const router = useRouter();
  const pathname = usePathname(); // 🔎 para saber la ruta actual
  const [mostrarMenuPerfil, setMostrarMenuPerfil] = useState(false);
  const [usuario, setUsuario] = useState<any | null>(null);

  useEffect(() => {
    const cargarUsuario = async () => {
      const uid = localStorage.getItem("usuarioId");
      if (!uid) return;

      try {
        const docRef = doc(db, "usuarios", uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setUsuario(snapshot.data());
        }
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };

    cargarUsuario();
  }, []);

  const handleCerrarSesion = () => {
    localStorage.removeItem("usuarioId");
    setMostrarMenuPerfil(false);
    router.push("/");
  };

  const handleNavegacion = (ruta: string) => {
    if (pathname === ruta) {
      router.refresh(); // solo refresca si ya está en la página
    } else {
      router.push(ruta);
    }
  };

  const isActive = (ruta: string) => pathname === ruta;

  return (
    <header className="header">
      <div className="header-left">
        <Link href="/" onClick={() => handleNavegacion("/")}>
          <Image
            src="/Letrapost.png"
            alt="Logo"
            width={70}
            height={55}
            className="logo"
          />
        </Link>

        {/* 🔍 Búsqueda (expandida en PC, contraída en móvil) */}
        <div className="search-bar hidden sm:flex items-center ml-4">
          <Image src="/Lupa.png" width={20} height={20} alt="Buscar" />
          <input
            type="text"
            placeholder="Busca tus intereses..."
            className="ml-2 px-2 py-1 border rounded-lg w-64 text-sm"
          />
        </div>

        {/* 🔍 Icono solo en móvil */}
        <button className="search-button sm:hidden ml-2">
          <Image src="/Lupa.png" width={24} height={24} alt="Buscar" />
        </button>
      </div>

      <nav className="nav-icons">
        <button
          onClick={() => handleNavegacion("/Feed")}
          className={`nav-item ${isActive("/Feed") ? "active" : ""}`}
        >
          <Image src="/Inicio.png" width={24} height={24} alt="Inicio" />
          <span className="nav-label">Inicio</span>
        </button>
        <button
          onClick={() => handleNavegacion("/Unimarket")}
          className={`nav-item ${isActive("/Unimarket") ? "active" : ""}`}
        >
          <Image src="/Market.png" width={24} height={24} alt="Marketplace" />
          <span className="nav-label">UniMarket</span>
        </button>
        <button
          onClick={() => handleNavegacion("/Perfil")}
          className={`nav-item ${isActive("/Perfil") ? "active" : ""}`}
        >
          <Image src="/Usuario.png" width={18} height={20} alt="Perfil" />
          <span className="nav-label">Perfil</span>
        </button>
      </nav>

      <div className="header-right">
        <MenuLateral />

        <div className="relative ml-4">
          <button onClick={() => setMostrarMenuPerfil(!mostrarMenuPerfil)}>
            <img
              src={usuario?.fotoPerfil || "/Perfil.png"}
              alt="Foto de perfil"
              width={36}
              height={36}
              className="perfil-pic"
            />
          </button>

          {mostrarMenuPerfil && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border rounded shadow z-50 text-sm">
              <button
                onClick={() => {
                  setMostrarMenuPerfil(false);
                  router.push("/Perfil");
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Ver perfil
              </button>
              <button
                onClick={handleCerrarSesion}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
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
