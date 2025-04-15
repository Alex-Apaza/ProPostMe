'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './registro.css';  // Asegúrate de tener el archivo CSS

const RegistroPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí manejarías el envío del formulario (por ejemplo, llamando a una API)
    console.log(formData);
  };

  return (
    <div className="registro-container">
      <div className="registro-left">
      <img className="whatsapp-image" src="/illustration2.png" />
</div>

      <div className="registro-right">
        <h2>Regístrate</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombres y Apellidos</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Link href="/loginsesion">  
            <div className="form-group">
            <button type="submit">Registrar</button>
            </div></Link>
         
        </form>

        <div className="login-link">
          <p>¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegistroPage;
