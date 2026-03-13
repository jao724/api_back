import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, description }),
      });
      if (!res.ok) throw new Error('Error al crear tarea');

    resetForm();
      fetchTasks();
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return {
    tasks,
    title,
    setTitle,
    description,
    setDescription,
    error,
    handleSubmit,
    fetchTasks,
  };
}

export default useTasks;
