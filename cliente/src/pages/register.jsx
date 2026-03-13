
import React, { useState } from 'react'
import { useFormAction, useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usuario: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas de seguridad
    if (!formData.usuario || !formData.email || !formData.password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }


    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (!response.ok) {

        let errorText = 'Error desconocido';
        try {
          const errorData = await response.json();
          console.error('Error del servidor:', errorData);
          if (errorData.errors) {
            errorText = Object.values(errorData.errors).flat().join('; ');
          } else if (errorData.message) {
            errorText = errorData.message;
          } else if (errorData.error) {
            errorText = JSON.stringify(errorData.error);
          }
        } catch (e) {
          console.error('No se pudo parsear JSON de error:', e);
        }
        alert(`Error en el registro: ${errorText}`);
        return;
      }

      const userData = await response.json();


      setFormData({
        usuario: '',
        email: '',
        password: ''
      });
      navigate('/tasks');

    } catch (error) {
      console.error('Error de registro ocurrido');
      alert(`Error de conexión: ${error.message}\n\nAsegúrate que el servidor esté corriendo.`);
    }

  };

  return (
    <div className="contenedor">
      <div className="form-header">
        <h2>Registro</h2>
        <p className="subtitle">Únete a nuestra comunidad hoy mismo</p>
      </div>

      <form className="form-register" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Nombre de usuario"
            name="usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />
        </div>

        <button type="submit">
          Crear cuenta
        </button>
      </form>

      <div className="form-footer">
        <p>¿Ya tienes una cuenta? <span className="link" onClick={() => navigate('/login')}>Inicia sesión</span></p>
      </div>
    </div>
  )
}

