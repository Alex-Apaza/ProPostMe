// components/MenuUnimarket.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import './Menumarket.css'

const categorias = ['Todos', 'Libros', 'Electrónicos', 'Muebles', 'Transporte', 'Apuntes', 'Ropa', 'Otros']

const MenuUnimarket = () => {
  return (
    <aside className="menu-unimarket">
      <Link href="/Unimarket/publicar" className="btn-vender">
        🛍️ Vender un producto
      </Link>

      <h3 className="menu-title">Categorías</h3>
      <ul className="categorias-lista">
        {categorias.map((cat) => (
          <li key={cat}>
            <button className="categoria-boton">{cat}</button>
          </li>
        ))}
      </ul>

      <h3 className="menu-title mt-4">Filtros</h3>
      <label>Precio máximo</label>
      <input type="number" placeholder="Máx" className="input-precio" />
    </aside>
  )
}

export default MenuUnimarket
