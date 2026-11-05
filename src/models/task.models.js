import { getPool } from '../db.js';

/**
 * Modelo de Tarea - Operaciones CRUD con MySQL
 */
const Task = {
  /**
   * Crea una nueva tarea y la devuelve completa
   */
  create: async ({ title, description, date, user_id }) => {
    const pool = getPool();
    const fechaTarea = date ? new Date(date) : new Date();
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, date, user_id) VALUES (?, ?, ?, ?)',
      [title || null, description, fechaTarea, user_id]
    );
    // Devolver la tarea recién creada
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    return rows[0];
  },

  /**
   * Busca todas las tareas de un usuario
   */
  findByUser: async (user_id) => {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY createdAt DESC',
      [user_id]
    );
    return rows;
  },

  /**
   * Busca una tarea por ID y usuario (para seguridad)
   */
  findOne: async ({ id, user_id }) => {
    const pool = getPool();
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ? LIMIT 1',
      [id, user_id]
    );
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Elimina una tarea por ID y usuario. Devuelve true si se eliminó.
   */
  deleteOne: async ({ id, user_id }) => {
    const pool = getPool();
    const [result] = await pool.query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, user_id]
    );
    return result.affectedRows > 0;
  },

  /**
   * Actualiza una tarea por ID y usuario. Devuelve la tarea actualizada.
   */
  updateOne: async ({ id, user_id }, data) => {
    const pool = getPool();

    // Construir SET dinámico solo con los campos proporcionados
    const camposPermitidos = ['title', 'description', 'date'];
    const campos = [];
    const valores = [];

    for (const campo of camposPermitidos) {
      if (data[campo] !== undefined) {
        campos.push(`${campo} = ?`);
        valores.push(campo === 'date' ? new Date(data[campo]) : data[campo]);
      }
    }

    if (campos.length === 0) {
      // Si no hay campos para actualizar, devolver la tarea actual
      return await Task.findOne({ id, user_id });
    }

    valores.push(id, user_id);

    const [result] = await pool.query(
      `UPDATE tasks SET ${campos.join(', ')} WHERE id = ? AND user_id = ?`,
      valores
    );

    if (result.affectedRows === 0) return null;

    // Devolver la tarea actualizada
    return await Task.findOne({ id, user_id });
  }
};

export default Task;
