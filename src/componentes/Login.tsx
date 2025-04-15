// components/Login.tsx
import Image from 'next/image';
import Link from 'next/link';
import './Login.css';
import checkIcon from '../public/globe.svg';

const Login = () => {
  return (
    <div className="login-container">
      {/* Imagen a la izquierda */}
      <div className="registro-left">
        <img className="whatsapp-image" src="/illustration2.png" />
      </div>

      {/* Formulario a la derecha */}
      <div className="login">
        <div className="div">
          <div className="frame">
            <p className="text-wrapper">Iniciar sesión con su cuenta</p>
          </div>
        </div>

        <p className="o-iniciar-sesi-n-con">
          <span className="span">-------------</span>
          <span className="text-wrapper-2"> o Iniciar sesión con correo electrónico </span>
          <span className="span">-------------</span>
        </p>

        <div className="div">
          <div className="inicioep">
            <div className="div-2">
              <div className="text-wrapper-3">Email</div>
              <div className="div-wrapper">
              <input type="email" className="text-wrapper-4" placeholder="mail@abc.com" />
              </div>
            </div>
            <div className="password">
              <div className="div-2">
                <div className="text-wrapper-3">Contraseña</div>
                <div className="div-wrapper">
                <input type="email" className="text-wrapper-4" placeholder="************" />
                </div>
              </div>
              <div className="frame-3">
                <div className="checkbox">
                  <div className="check">
                    <div className="check-solid">
                      <Image className="icons-navigation" src={checkIcon} alt="check" width={8} height={8} />
                    </div>
                  </div>
                  <div className="text-wrapper-6">Recordar</div>
                </div>
                <div className="text-wrapper-7">Forgot Password?</div>
              </div>
            </div>
          </div>
          <Link href="/loginsesion">  //añadir el principal
            <div className="bingresar">
            <div className="text-wrapper-8">Ingresar</div>
            </div></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
