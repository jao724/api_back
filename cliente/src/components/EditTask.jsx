import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Error al cargar la tarea');
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error('Error al actualizar tarea');
      navigate('/tasks');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center text-white mt-10">Cargando...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen text-white pt-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold bg-linear-to-br from-white to-zinc-500 bg-clip-text text-transparent">
          Editar Tarea
        </h1>
      </div>
      
      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center animate-pulse">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contenedor max-w-none! m-0! mt-0! mb-12 transform-none hover:transform-none">
        <div className="form-header text-left">
          <h2 className="text-2xl! text-left!">Refinar Tarea</h2>
          <p className="subtitle text-left!">Actualiza los detalles de este objetivo</p>
        </div>

        <div className="form-register p-0!">
          <div className="input-group">
            <input
              type="text"
              placeholder="¿Qué hay que hacer?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <textarea
              className="w-full p-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-zinc-600 transition-all min-h-[120px] resize-none"
              placeholder="Añade una descripción detallada..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button type="submit" className="flex-1 m-0!">
              Actualizar Tarea
            </button>
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="px-6 bg-white/5 border border-white/10 hover:bg-white/10 shadow-none m-0!"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
