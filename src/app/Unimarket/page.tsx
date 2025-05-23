// app/UniMarket/page.tsx
'use client'

import Headerp from '@/componentes/Headerp'
import MenuUnimarket from '@/componentes/Menumarket'

export default function UniMarketPage() {
  return (
    <>
      <Headerp />
      <div className="flex">
        <MenuUnimarket />
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold">Todos los productos</h2>
          <p className="text-sm text-zinc-500 mb-4">6 productos encontrados</p>
          {/* Aquí irán las tarjetas de productos más adelante */}
        </div>
      </div>
    </>
  )
}
