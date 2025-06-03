'use client'

import React from 'react'
import Link from 'next/link'
import './Menumarket.css'
import { Dispatch, SetStateAction } from 'react'

const categoria = ['Dashboard', 'Usuarios', 'Reportes',]

type Props = {
  setFiltros: Dispatch<SetStateAction<{ categoria: string; precioMax: number }>>
}

const MenuAdmin : React.FC<Props> = ({ setFiltros }) => {
  const handleCategoria = (cat: string) => {
    setFiltros((prev) => ({ ...prev, categoria: cat }))
  }

 

  return (
    <aside className="menu-unimarket">
      <Link href="/Feed" className="btn-vender">
        Realizar una Publicacion
      </Link>

      <h3 className="menu-title">categoria</h3>
      <ul className="categoria-lista">
        {categoria.map((cat) => (
          <li key={cat}>
            <button className="categoria-boton" onClick={() => handleCategoria(cat)}>
              {cat}
            </button>
          </li>
        ))}
      </ul>

      <h3 className="menu-title mt-4">Buscar Usario</h3>
      <label>Nombre:</label>
      <input
        type="number"
        placeholder="name"
        className="input-precio"
        min={0}
      />
    </aside>
  )
}

export default MenuAdmin
