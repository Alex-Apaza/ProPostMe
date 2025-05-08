import React from "react";
import Image from "next/image";
import Formlogin from "@/componentes/Formlogin";
import "./Login.css";

const LoginPage = () => {
  return (
    <div className="contenedorlogin">
      <div className="flex">
        <div className="arealogin">
          <Image src="/Letrapost.png" alt="Logo" width={300} height={300} />
          <div className="textoinicio">
            Post-Me te ayuda a comunicarte con personas de tu Universidad
          </div>
        </div>

        <Formlogin />
      </div>
      
    </div>
  );
};

export default LoginPage;
