import React from "react";
import Image from "next/image";
import "./Headerp.css";

const Principal = () => {
  return (
    <div className="container">
      <div className="menubusqueda">
      <button className="menu-button">
        <Image
          className="menu"
          src="/Menu.png"
          width={30}
          height={30}
          alt="Icono de menú"
        />
      </button>
        <div className="busqueda">
          <Image
            className="lupa"
            src="/Lupa.png"
            width={30}
            height={30}
            alt={"Icono de menu"}
          />
          <input
            type="text"
            placeholder="Buscar"
            className="input h-[21px] text-sm text-[#9e9e9e] font-['Roboto-Regular',Helvetica] placeholder:text-[#9e9e9e]"
          />
        </div>
        </div>
        <div className="perfil">
          <Image
            className="usuario"
            src="/Usuario.png"
            width={30}
            height={30}
            alt={"Icono de menu"}
          />
        </div>
      
    </div>
  );
};

export default Principal;
