// ✅ MenuUnimarket.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import './Menumarket.css'
import { Dispatch, SetStateAction } from 'react'

const categorias = ['Todos', 'Libros', 'Electronicos', 'Trabajos', 'Ropa y Accesorios', 'Otros']

type Props = {
  setFiltros: Dispatch<SetStateAction<{ categoria: string; precioMax: number; busqueda: string }>>
}

const MenuUnimarket: React.FC<Props> = ({ setFiltros }) => {
  const handleCategoria = (cat: string) => {
    setFiltros((prev) => ({ ...prev, categoria: cat }))
  }

  const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseFloat(e.target.value)
    setFiltros((prev) => ({
      ...prev,
      precioMax: isNaN(valor) ? Infinity : valor,
    }))
  }

  const handleBusqueda = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros((prev) => ({ ...prev, busqueda: e.target.value }))
  }

  return (
    <aside className="menu-unimarket">
      <Link href="/Unimarket/publicar" className="btn-vender">
        Vender un producto
      </Link>

      <h3 className="menu-title">Categorías</h3>
      <ul className="categorias-lista">
        {categorias.map((cat) => (
          <li key={cat}>
            <button className="categoria-boton" onClick={() => handleCategoria(cat)}>
              {cat}
            </button>
          </li>
        ))}
      </ul>

      <h3 className="menu-title mt-4">Filtros</h3>

      <label>Buscar por título</label>
      <input
        type="text"
        placeholder="Buscar..."
        className="input-precio"
        onChange={handleBusqueda}
      />

      <label className="mt-2">Precio máximo</label>
      <input
        type="number"
        placeholder="Máx"
        className="input-precio"
        onChange={handlePrecio}
        min={0}
      />
    </aside>
  )
}

export default MenuUnimarket 
