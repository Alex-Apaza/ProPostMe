'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TarjetasAdminProps {
  filtros: {
    categoria: string
  }
}

interface Usuario {
  id: string
  nombre: string
  apellido: string
  carrera: string
  correo_institucional: string
  creadoEn: string
  fotoPerfil: string
  universidadNombre: string
}

interface Reporte {
  id: string
  fecha: string
  motivo: string
  postId: string
  usuarioQueReporta: string
  usuarioReportado: string
}

export default function TarjetasAdmin({ filtros }: TarjetasAdminProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [reportes, setReportes] = useState<Reporte[]>([])
  const [nuevoUsuario, setNuevoUsuario] = useState<Partial<Usuario>>({})

  // === USUARIOS ===
  const obtenerUsuarios = async () => {
    const usuariosRef = collection(db, 'usuarios')
    const snapshot = await getDocs(usuariosRef)
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Usuario[]
    setUsuarios(lista)
  }

  const crearUsuario = async () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.correo_institucional) return
    await addDoc(collection(db, 'usuarios'), {
      ...nuevoUsuario,
      creadoEn: new Date().toISOString(),
    })
    setNuevoUsuario({})
    obtenerUsuarios()
  }

  const editarUsuario = async (id: string, campo: keyof Usuario, valor: string) => {
    const ref = doc(db, 'usuarios', id)
    await updateDoc(ref, { [campo]: valor })
    obtenerUsuarios()
  }

  const eliminarUsuario = async (id: string) => {
    const ref = doc(db, 'usuarios', id)
    await deleteDoc(ref)
    obtenerUsuarios()
  }

  // === REPORTES ===
  const obtenerReportes = async () => {
    const reportesRef = collection(db, 'reportes')
    const snapshot = await getDocs(reportesRef)
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Reporte[]
    setReportes(lista)
  }

  const eliminarReporte = async (id: string) => {
    const ref = doc(db, 'reportes', id)
    await deleteDoc(ref)
    obtenerReportes()
  }

  // === USE EFFECT SEGÚN FILTRO ===
  useEffect(() => {
    if (filtros.categoria === 'Usuarios') obtenerUsuarios()
    if (filtros.categoria === 'Reportes') obtenerReportes()
  }, [filtros])

  // === RENDER USUARIOS ===
  if (filtros.categoria === 'Usuarios') {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">Gestión de Usuarios</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
          <Input
            placeholder="Nombre"
            value={nuevoUsuario.nombre || ''}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
          />
          <Input
            placeholder="Apellido"
            value={nuevoUsuario.apellido || ''}
            onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })}
          />
          <Input
            placeholder="Correo"
            value={nuevoUsuario.correo_institucional || ''}
            onChange={(e) =>
              setNuevoUsuario({ ...nuevoUsuario, correo_institucional: e.target.value })
            }
          />
          <Button onClick={crearUsuario}>Crear Usuario</Button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Nombre</th>
              <th className="p-2">Apellido</th>
              <th className="p-2">Correo</th>
              <th className="p-2">Carrera</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2">
                  <Input
                    value={u.nombre}
                    onChange={(e) => editarUsuario(u.id, 'nombre', e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={u.apellido}
                    onChange={(e) => editarUsuario(u.id, 'apellido', e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={u.correo_institucional}
                    onChange={(e) =>
                      editarUsuario(u.id, 'correo_institucional', e.target.value)
                    }
                  />
                </td>
                <td className="p-2">
                  <Input
                    value={u.carrera}
                    onChange={(e) => editarUsuario(u.id, 'carrera', e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <Button variant="destructive" onClick={() => eliminarUsuario(u.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // === RENDER REPORTES ===
  if (filtros.categoria === 'Reportes') {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-4">Reportes de Publicaciones</h3>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Motivo</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Post ID</th>
              <th className="p-2">Usuario Que Reporta</th>
              <th className="p-2">Usuario Reportado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.motivo}</td>
                <td className="p-2">{r.fecha}</td>
                <td className="p-2">{r.postId}</td>
                <td className="p-2">{r.usuarioQueReporta}</td>
                <td className="p-2">{r.usuarioReportado}</td>
                <td className="p-2">
                  <Button variant="destructive" onClick={() => eliminarReporte(r.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return null
}
