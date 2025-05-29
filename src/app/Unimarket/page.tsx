'use client';

import Headerp from '@/componentes/Headerp';
import MenuUnimarket from '@/componentes/Menumarket';
import TarjetasMarket from '@/componentes/TarjetasMarket';

export default function UniMarketPage() {
  return (
    <>
      <Headerp />
      <div className="flex">
        <MenuUnimarket />
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold">Todos los productos</h2>
          <p className="text-sm text-zinc-500 mb-4">Productos disponibles</p>
          <TarjetasMarket />
        </div>
      </div>
    </>
  );
}
