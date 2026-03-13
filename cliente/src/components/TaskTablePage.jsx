import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

export default function TaskTablePage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_URL}/tasks`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Error al cargar tareas');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen text-white pt-24">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold bg-linear-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Listado de Tareas
          </h1>
          <p className="text-zinc-500 mt-2">Vista detallada en formato tabla</p>
        </div>

        <button
          onClick={() => navigate('/tasks')}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl border border-white/10 transition-all font-bold m-0"
        >
          Volver a Crear Tareas
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center animate-pulse">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center text-zinc-500 py-12">Cargando tareas...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-zinc-500 py-12 bg-white/5 rounded-2xl border border-white/5">
          <p className="text-xl">No hay tareas pendientes.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="text-xs text-zinc-300 uppercase bg-zinc-800/80 border-b border-white/10">
              <tr>
                <th scope="col" className="px-6 py-4 rounded-tl-xl truncate max-w-[400px]">Título</th>
                <th scope="col" className="px-6 py-4">Descripción</th>
                <th scope="col" className="px-6 py-4">Estado</th>
                <th scope="col" className="px-6 py-4 text-center rounded-tr-xl w-32">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr 
                  key={task._id} 
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    index === tasks.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-white max-w-[200px] truncate" title={task.title}>
                    {task.title}
                  </td>
                  <td className="px-6 py-4 max-w-[400px] truncate" title={task.description}>
                    {task.description}
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-500/20 text-blue-400 py-1 px-3 rounded-full text-xs font-bold border border-blue-500/30">
                      Pendiente
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/tasks/edit/${task._id}`)}
                      className="p-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-lg transition-colors border border-yellow-500/20 m-0 shadow-none"
                      title="Editar Tarea"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => navigate(`/tasks/delete/${task._id}`)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/20 m-0 shadow-none"
                      title="Eliminar Tarea"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
