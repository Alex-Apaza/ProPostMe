'use client'

import Headerp from '@/componentes/Headerp'
import MenuUnimarket from '@/componentes/Menumarket'
import TarjetasMarket from '@/componentes/TarjetasMarket'
import { useState } from 'react'

export default function UniMarketPage() {
  const [filtros, setFiltros] = useState({
    categoria: 'Todos',
    precioMax: Infinity,
  })

  return (
    <>
      <Headerp />
      <div className="flex">
        <MenuUnimarket setFiltros={setFiltros} />
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold">Todos los productos</h2>
          <p className="text-gray-600 mb-4">
            Explora y encuentra productos de tu interes.
          </p>
          <TarjetasMarket filtros={filtros} />
        </div>
      </div>
    </>
  )
}
