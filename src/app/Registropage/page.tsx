import React from 'react'
import Formregister from '@/componentes/Formregister'
import Image from 'next/image'
import './registro.css';
const page = () => {
  return (
    <div className='contenedor'>
      <div>
      <Image
                        className="letrapost"
                        src="/Letrapost.png"
                        width={300}
                        height={300}
                        alt="Icono de menú"
                      />
      </div>
      <div className='blokeregistro'>
      <Formregister/>
      </div>
    </div>
  )
}

export default page
