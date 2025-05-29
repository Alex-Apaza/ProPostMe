'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import Image from 'next/image'
import QRCode from 'react-qr-code'
import Headerp from '@/componentes/Headerp'
import './Infopost.css'

const InfoPostPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [usuario, setUsuario] = useState<any>(null)

  useEffect(() => {
    const cargarPost = async () => {
      const ref = doc(db, 'postmarket', id as string)
      const snap = await getDoc(ref)
      if (snap.exists()) {
        const data = snap.data()
        setPost(data)

        const userSnap = await getDoc(doc(db, 'usuarios', data.usuarioId))
        if (userSnap.exists()) {
          setUsuario(userSnap.data())
        }
      }
    }

    cargarPost()
  }, [id])

  if (!post) return <div className="cargando">Cargando producto...</div>

  return (
    <>
      <Headerp />

      {/* Botón cerrar */}
      <button
        className="btn-cerrar"
        onClick={() => router.push('/Unimarket')}
        title="Volver"
      >
        ✕
      </button>

      <div className="infopost-contenedor">
        <div className="imagen-grande">
          <img src={post.fotoUrl || '/default.jpg'} alt="Producto" />
        </div>

        <div className="detalles">
          <h2 className="subtitulo">Título:</h2>
          <p className="dato">{post.titulo}</p>

          <h2 className="subtitulo">Precio:</h2>
          <p className="dato precio">Bs. {post.precio}</p>

          <h2 className="subtitulo">Estado:</h2>
          <p className="dato">{post.estado}</p>

          <h2 className="subtitulo">Descripción:</h2>
          <div className="descripcion-box">
            <p>{post.descripcion}</p>
          </div>

          <h2 className="subtitulo mt-3">Información del vendedor:</h2>
          {usuario && (
            <div className="vendedor-info">
              <Image
                src={usuario.fotoPerfil || '/Perfil.png'}
                alt="Usuario"
                width={40}
                height={40}
                className="foto-vendedor"
              />
              <span>{usuario.nombre}</span>
            </div>
          )}

          <h2 className="subtitulo mt-3">Contáctame 😉:</h2>
          <div className="contacto">
            {post.contactoTipo === 'correo' ? (
              <a href={`mailto:${post.contacto}`} className="correo-link">
                {post.contacto}
              </a>
            ) : (
              <QRCode value={post.contacto} size={120} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default InfoPostPage
