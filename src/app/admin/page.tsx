'use client'
import Crearpost from '@/componentes/Crearpost'
import Cardrep from '@/componentes/Crearpostr'
import MenuAdmin from '@/componentes/MenuAdmin'
import TarjetasAdmin from '@/componentes/TarjetasAdmin'

import { useState } from 'react'
import React from 'react' 

export default function Page() {
  const [filtros, setFiltros] = useState({
    categoria: 'Todos',
    precioMax: Infinity,
  })
  return (
    <>
         
      <div className="flex">
        <MenuAdmin setFiltros={setFiltros} />
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold">Hola Administrador</h2>
          <p className="text-gray-600 mb-4">
            Contribuye al bienestar de la comunidad promoviendo una experiencia segura, respetuosa y saludable para todos.
          </p>
          <Cardrep/>
          <TarjetasAdmin filtros={filtros} />
        </div>
      </div>
    </>
  )
}


