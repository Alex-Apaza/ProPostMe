'use client'

import React from 'react'
import Link from 'next/link'
import './Menumarket.css'
import { Dispatch, SetStateAction } from 'react'

const categoria = ['Dashboard', 'Usuarios', 'Reportes', 'Crear Usuario','Cerrar Sesión']

type Props = {
  setFiltros: Dispatch<SetStateAction<{ categoria: string; precioMax: number }>>
}

const MenuAdmin : React.FC<Props> = ({ setFiltros }) => {
  const handleCategoria = (cat: string) => {
    setFiltros((prev) => ({ ...prev, categoria: cat }))
  }

 

  return (
    <aside className="menu-unimarket">
      <Link href="/addpost" className="btn-vender">
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
      <Link href="/addpost" className="btn-vender">
        Analisis de Datos 
      </Link>

      
    </aside>
  )
}

export default MenuAdmin
