import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

export default function DeleteTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
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
        setTask(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Error al eliminar tarea');
      navigate('/tasks');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center text-white mt-10">Cargando...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen text-white pt-24">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold bg-linear-to-br from-red-500 to-red-900 bg-clip-text text-transparent">
          Borrar Tarea
        </h1>
      </div>
      
      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center animate-pulse">
          {error}
        </div>
      )}

      {task && (
        <div className="contenedor max-w-none! m-0! mt-0! mb-12 transform-none hover:transform-none border border-red-500/50!">
          <div className="form-header text-left">
            <h2 className="text-2xl! text-left! text-red-500!">¡Advertencia!</h2>
            <p className="subtitle text-left!">Estás a punto de borrar la siguiente tarea. Esta acción no se puede deshacer.</p>
          </div>
          
          <div className="bg-white/5 p-4 rounded-xl mt-4 mb-6">
            <h3 className="text-xl font-bold bg-linear-to-r from-white to-zinc-400 bg-clip-text text-transparent truncate mb-2">
              {task.title}
            </h3>
            <p className="text-zinc-400 text-sm mt-2 whitespace-pre-wrap">{task.description}</p>
          </div>

          <div className="flex gap-3 mt-4">
            <button 
              onClick={handleDelete} 
              className="flex-1 m-0! bg-red-600! hover:bg-red-700! shadow-red-500/20 border-red-500"
            >
              Sí, Borrar Definitivamente
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
      )}
    </div>
  );
}
