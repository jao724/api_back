
// import { useState, useEffect } from 'react';

// export default function Tasks() {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [error, setError] = useState(null);

//   // URL base del backend - Ajusta si es necesario
//   const API_URL = 'http://localhost:3000/api'; 

//   // Función para obtener todas las tareas (READ)
//   const fetchTasks = async () => {
//     try {
//       const response = await fetch(`${API_URL}/tasks`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include', // Importante para enviar cookies
//       });

//       if (!response.ok) throw new Error('Error al cargar tareas');

//       const data = await response.json();
//       setTasks(data);
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   // Cargar tareas al montar el componente
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Función para crear o actualizar una tarea (CREATE / UPDATE)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     try {
//       if (editingId) {
//         // Update Task (PUT)
//         const response = await fetch(`${API_URL}/tasks/${editingId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({ title, description }),
//         });

//         if (!response.ok) throw new Error('Error al actualizar tarea');
//       } else {
//         // Create Task (POST)
//         const response = await fetch(`${API_URL}/tasks`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           credentials: 'include',
//           body: JSON.stringify({ title, description }),
//         });

//         if (!response.ok) throw new Error('Error al crear tarea');
//       }

//       // Limpiar formulario y recargar tareas
//       setTitle('');
//       setDescription('');
//       setEditingId(null);
//       fetchTasks();
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   // Función para eliminar tarea (DELETE)
//   const deleteTask = async (id) => {
//     if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;

//     try {
//       const response = await fetch(`${API_URL}/tasks/${id}`, {
//         method: 'DELETE',
//         credentials: 'include',
//       });

//       if (!response.ok) throw new Error('Error al eliminar tarea');

//       fetchTasks();
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     }
//   };

//   // Preparar formulario para edición
//   const handleEdit = (task) => {
//     setEditingId(task._id);
//     setTitle(task.title);
//     setDescription(task.description);
//   };

//   // Cancelar edición
//   const cancelEdit = () => {
//     setEditingId(null);
//     setTitle('');
//     setDescription('');
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-zinc-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">Gestor de Tareas</h1>

//       {error && (
//         <div className="bg-red-500 p-3 mb-4 rounded text-center">
//           {error}
//         </div>
//       )}

//       {/* Formulario */}
//       <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-gray-200">
//           {editingId ? 'Editar Tarea' : 'Nueva Tarea'}
//         </h2>
//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Título"
//             className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <textarea
//             placeholder="Descripción"
//             className="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             rows="3"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <div className="flex gap-2">
//           <button
//             type="submit"
//             className={`px-4 py-2 rounded font-bold transition-colors ${
//               editingId 
//                 ? 'bg-green-600 hover:bg-green-700' 
//                 : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {editingId ? 'Actualizar' : 'Guardar'}
//           </button>
//           {editingId && (
//             <button
//               type="button"
//               onClick={cancelEdit}
//               className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 font-bold"
//             >
//               Cancelar
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Lista de Tareas */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {tasks.map((task) => (
//           <div key={task._id} className="bg-zinc-800 p-4 rounded-lg shadow border border-zinc-700 hover:border-blue-500 transition-colors">
//             <h3 className="text-xl font-bold text-blue-400 mb-2 truncate">{task.title}</h3>
//             <p className="text-gray-300 mb-4 h-20 overflow-y-auto">{task.description}</p>
//             <div className="flex justify-end gap-2 mt-auto">
//               <button
//                 onClick={() => handleEdit(task)}
//                 className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors"
//               >
//                 Editar
//               </button>
//               <button
//                 onClick={() => deleteTask(task._id)}
//                 className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
//               >
//                 Eliminar
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {tasks.length === 0 && (
//         <p className="text-center text-gray-500 mt-8">No hay tareas pendientes.</p>
//       )}
//     </div>
//   );
// }

import { useTasks } from './hooks/useTasks';
import TaskForm from './TaskForm';

export default function Tasks() {
  const {
    tasks, title, setTitle, description, setDescription,
    error, handleSubmit
  } = useTasks();

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen text-white pt-24">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold bg-linear-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Tus Tareas
          </h1>
          <p className="text-zinc-500 mt-2">Gestiona tu productividad diaria con estilo</p>
        </div>


        <div className="flex gap-4 items-center flex-wrap justify-center">
          {tasks.length > 0 && (
            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
              <span className="text-zinc-400 text-sm">Total: </span>
              <span className="text-blue-400 font-bold ml-1">{tasks.length}</span>
            </div>
          )}

          <a 
            href="/tasks/table"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all font-bold"
          >
            Ver en Tabla
          </a>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-center animate-pulse">
          {error}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <div className="w-full max-w-2xl">
          <TaskForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}
