import React from 'react'
import Image from "next/image";
import './Crearpost.css';
const Crearpost = () => {
  return (
    <div className='blockcrear'>
      <div className='llenado'>
        <Image
                  className="Fotoperfil"
                  src="/Perfil.png"
                  width={30}
                  height={30}
                  alt="Icono de menú"
                />
          <input
            type="text"
            placeholder="En que estas pensando?"
            className="queinput h-[30px] text-sm text-[#9e9e9e] font-['Roboto-Regular',Helvetica] placeholder:text-[#9e9e9e]"
          />
      </div>
      <div className='multincog'>
        <div className='addmulti'>
          <div>Agregar Foto/Video</div>
          <Image
            className="addimagen"
            src="/multi.png"
            width={30}
            height={30}
            alt="Icono de multimedia"
          />
        </div>
        <div className='incognito'>
          <div>Post Incognito</div>
          <Image
            className="postinc"
            src="/incognito.png"
            width={30}
            height={30}
            alt="Icono incognito"
          />
      </div>
    </div>
    </div>
  )
}

export default Crearpost
