import React from "react";
import Image from "next/image";
import Formlogin from "@/componentes/Formlogin";
import "./Login.css";

const LoginPage = () => {
  return (
    <div className="contenedorlogin">
      <div className="flex login-wrapper">
        <div className="arealogin">
          <Image src="/Letrapost.png" alt="Logo" width={300} height={300} />
          <div className="titulo-login">Conecta con tu comunidad universitaria</div>
          <p className="subtitulo-login">
            La plataforma exclusiva para estudiantes universitarios. Comparte,
            conecta y compra/vende con otros estudiantes.
          </p>
          <div className="grid-bloques">
            <div className="bloque-login">
              <h4>Comunidad</h4>
              <p>Conecta con estudiantes de tu universidad</p>
            </div>
            <div className="bloque-login">
              <h4>UniMarket</h4>
              <p>Compra y vende artículos universitarios</p>
            </div>
            <div className="bloque-login">
              <h4>Eventos</h4>
              <p>Descubre eventos en tu campus</p>
            </div>
            <div className="bloque-login">
              <h4>Recursos</h4>
              <p>Comparte apuntes y recursos académicos</p>
            </div>
          </div>
        </div>

        <div className="formlogin-wrapper">
          <Formlogin />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;