import task from "../models/task.models.js";

export const createTasks = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newtask = new task({
      title,
      description,
      date,
      user: req.user.id
    });
    const saveTask = await newtask.save();
    res.json(saveTask);
  } catch (error) {
    console.error('Error creating task');
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};



export const getTasks = async (req, res) => {
  try {
    const tasks = await task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks');
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};



export const getTask = async (req, res) => {
  try {
    const tarea = await task.findOne({ _id: req.params.id, user: req.user.id });
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada o acceso denegado' });
    res.json(tarea);
  } catch (error) {
    console.error('Error fetching single task');
    res.status(500).json({ message: 'Error al buscar la tarea' });
  }
};



export const deleteTask = async (req, res) => {
  try {
    const tarea = await task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada o acceso denegado' });
    return res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting task');
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};



export const upDateTask = async (req, res) => {
  try {
    const tarea = await task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada o acceso denegado' });
    res.json(tarea);
  } catch (error) {
    console.error('Error updating task');
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

