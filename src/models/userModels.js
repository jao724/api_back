import { getPool } from '../db.js';

/**
 * Modelo de Usuario - Operaciones CRUD con MySQL
 */
const User = {
  /**
   * Busca un usuario por email
   */
  findOne: async ({ email }) => {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Busca un usuario por su ID
   */
  findById: async (id) => {
    const pool = getPool();
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  /**
   * Crea un nuevo usuario y lo devuelve con su ID generado
   */
  create: async ({ usuario, email, password }) => {
    const pool = getPool();
    const [result] = await pool.query(
      'INSERT INTO users (usuario, email, password) VALUES (?, ?, ?)',
      [usuario, email, password]
    );
    return {
      id: result.insertId,
      usuario,
      email,
      password
    };
  }
};

export default User;
