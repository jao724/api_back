import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

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
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingId) {
        const res = await fetch(`${API_URL}/tasks/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ title, description }),
        });
        if (!res.ok) throw new Error('Error al actualizar tarea');
      } else {
        const res = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ title, description }),
        });
        if (!res.ok) throw new Error('Error al crear tarea');
      }

      resetForm();
      fetchTasks();
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta tarea?')) return;
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Error al eliminar tarea');
      fetchTasks();
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setTitle(task.title || '');
    setDescription(task.description || '');
  };

  return {
    tasks,
    title,
    setTitle,
    description,
    setDescription,
    editingId,
    error,
    handleSubmit,
    deleteTask,
    handleEdit,
    resetForm,
    fetchTasks,
  };
}

export default useTasks;
