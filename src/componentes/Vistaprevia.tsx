'use client'

import React from 'react'
import QRCode from 'react-qr-code'

interface VistaPreviaProps {
  titulo: string
  precio: string
  categoria: string
  estado: string
  descripcion: string
  imagenUrl: string
  contacto: string
  contactoTipo: 'correo' | 'telefono'
  nombreVendedor: string
  fotoVendedor: string
}

const VistaPrevia = ({
  titulo,
  precio,
  categoria,
  estado,
  descripcion,
  imagenUrl,
  contacto,
  contactoTipo,
  nombreVendedor,
  fotoVendedor,
}: VistaPreviaProps) => {
  const contactoQR = contactoTipo === 'telefono'
    ? contacto
    : `mailto:${contacto}`

  return (
    <div className="preview-container">
      <div className="preview-card">
        <div className="preview-imagen">
          {imagenUrl ? (
            <img src={imagenUrl} alt="Vista previa" className="img-previa" />
          ) : (
            <div className="sin-imagen">Vista previa de la publicación</div>
          )}
        </div>

        <div className="preview-detalles">
          <h3>{titulo || 'Sin título'}</h3>
          <p><strong>Bs.</strong> {precio || '0.00'}</p>
          <p><strong>Categoría:</strong> {categoria}</p>
          <p><strong>Estado:</strong> {estado}</p>
          <p><strong>Descripción:</strong> {descripcion}</p>

          <div className="vendedor-info">
            <img src={fotoVendedor || '/Perfil.png'} alt="Vendedor" className="vendedor-foto" />
            <p>{nombreVendedor || 'Anónimo'}</p>
          </div>

          <div className="qr-contacto">
            <QRCode value={contactoQR} size={96} />
            <p className="qr-texto">Escanea para contactar</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VistaPrevia
