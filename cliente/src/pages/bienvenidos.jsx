import React from 'react'
import { Link } from 'react-router-dom'

export default function Bienvenidos() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="contenedor text-center max-w-2xl transform hover:scale-[1.01] transition-transform duration-500">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold mb-4 bg-linear-to-br from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
            Gestión Inteligente de Tareas
          </h1>

          <p className="subtitle text-lg">
            Organiza tu vida con elegancia y seguridad. La plataforma premium para mantener tu productividad al máximo.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Link to="/register" className="w-full sm:w-auto">
            <button className="w-full px-12 py-4 rounded-xl bg-blue-600 font-bold text-white shadow-lg hover:bg-blue-700 hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
              Empezar Ahora
            </button>
          </Link>

          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full px-12 py-4 rounded-xl bg-white/5 border border-white/10 font-bold text-white backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              Iniciar Sesión
            </button>
          </Link>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 opacity-40">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">100%</span>
            <span className="text-xs uppercase tracking-widest">Seguro</span>
          </div>
          <div className="w-px h-8 bg-white/20"></div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">Rápido</span>
            <span className="text-xs uppercase tracking-widest">Optimizado</span>
          </div>
        </div>
      </div>
    </div>
  )
}

