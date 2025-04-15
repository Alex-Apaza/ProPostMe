import React from "react";
import "./StudentMobilityCard.css";
import Image from "next/image";

const StudentMobilityCard = () => {
  return (
    <div className="card-container">
      <div className="card-header">
        <Image
          className="Perfil"
          src="/Perfil.png"
          width={30}
          height={30}
          alt="Icono de menú"
        />
        <div className="user-info">
          <span className="username">Sumi Boliviar</span>
          <span className="date">DD/MM/AA</span>
        </div>
        <span className="options">⋮</span>
      </div>

      <p className="status-text">Vamosss!!!!</p>

      <div className="main-poster">
       <Image
                         className="Portada"
                         src="/Portada.png"
                         width={400}
                         height={400}
                         alt="Icono de menú"
                       />
      </div>

      <div className="card-footer">
        <span>👍 Me gusta</span>
        <span>💬 Comentar</span>
      </div>
    </div>
  );
};

export default StudentMobilityCard;
