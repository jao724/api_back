import Task from "../models/task.models.js";

export const createTasks = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const saveTask = await Task.create({
      title,
      description,
      date,
      user_id: req.user.id
    });
    res.json(saveTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};



export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findByUser(req.user.id);
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};



export const getTask = async (req, res) => {
  try {
    const tarea = await Task.findOne({ id: req.params.id, user_id: req.user.id });
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada o acceso denegado' });
    res.json(tarea);
  } catch (error) {
    console.error('Error fetching single task:', error.message);
    res.status(500).json({ message: 'Error al buscar la tarea' });
  }
};



export const deleteTask = async (req, res) => {
  try {
    const eliminada = await Task.deleteOne({ id: req.params.id, user_id: req.user.id });
    if (!eliminada) return res.status(404).json({ message: 'Tarea no encontrada o acceso denegado' });
    return res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};



export const upDateTask = async (req, res) => {
  try {
    const tarea = await Task.updateOne(
      { id: req.params.id, user_id: req.user.id },
      req.body
    );
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada o acceso denegado' });
    res.json(tarea);
  } catch (error) {
    console.error('Error updating task:', error.message);
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};
