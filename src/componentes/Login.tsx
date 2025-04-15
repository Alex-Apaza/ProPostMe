// components/Login.js
import Image from 'next/image';
import './Login.css'; // Asegúrate de colocar Login.css en la carpeta adecuada
//import checkIcon from '../public/globe.svg'; // Ajusta la ruta según corresponda

const Login = () => {
  return (
    <div className="login">
       <div className='image-conteiner' >
       <Image
  src="/ilustration2.png"
  alt="Imagen lateral"
  fill
  style={{ objectFit: 'cover' }}
  priority
/>

      </div>
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
              <div className="text-wrapper-4">mail@abc.com</div>
            </div>
          </div>
          <div className="password">
            <div className="div-2">
              <div className="text-wrapper-3">Contraseña</div>
              <div className="frame-2">
                <div className="text-wrapper-5">*****************</div>
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
        <div className="bingresar">
          <div className="text-wrapper-8">Ingresar</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
