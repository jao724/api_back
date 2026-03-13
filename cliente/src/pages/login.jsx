import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
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

    // Seguridad: Evitar campos vacíos
    if (!formData.email || !formData.password) {
      alert('Por favor, ingresa tus credenciales.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      if (!response.ok) {
        let errorText = 'Usuario o contraseña incorrectos';
        try {
          const errorData = await response.json();
          errorText = errorData.message || errorText;
        } catch (e) {
          // Error al parsear JSON
        }
        alert(errorText);
        return;
      }

      // Login exitoso
      navigate('/tasks');

    } catch (error) {
      console.error('Error de autenticación ocurrido');
      alert('Error de conexión con el servidor. Por favor, intenta de nuevo más tarde.');
    }
  };

  return (
    <div className="contenedor">
      <div className="form-header">
        <h2>Bienvenido</h2>
        <p className="subtitle">Ingresa tus datos para continuar</p>
      </div>

      <form className="form-register" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
          />
        </div>

        <button type="submit">
          Iniciar Sesión
        </button>
      </form>

      <div className="form-footer">
        <p>¿No tienes una cuenta? <span className="link" onClick={() => navigate('/register')}>Regístrate</span></p>
      </div>
    </div>
  )
}

