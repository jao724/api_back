import mysql from 'mysql2/promise';

// Pool de conexiones MySQL robusto
let pool = null;

/**
 * Crea y devuelve el pool de conexiones MySQL.
 * Usa un pool para reutilizar conexiones y mejorar el rendimiento.
 */
const crearPool = () => {
  if (pool) return pool;

  pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'api_back_db',
    waitForConnections: true,
    connectionLimit: 10,       // Máximo de conexiones simultáneas
    queueLimit: 0,             // Sin límite en la cola de espera
    enableKeepAlive: true,     // Mantener conexiones activas
    keepAliveInitialDelay: 10000, // Delay inicial para keep-alive (ms)
    connectTimeout: 10000,     // Timeout de conexión (ms)
    // Reintentar conexiones perdidas automáticamente
    maxIdle: 5,                // Máximo de conexiones inactivas
    idleTimeout: 60000,        // Tiempo máximo de inactividad (ms)
  });

  return pool;
};

/**
 * Conecta a la base de datos MySQL, crea la BD si no existe
 * e inicializa las tablas necesarias.
 */
const conectardb = async () => {
  try {
    // Primero crear la base de datos si no existe
    const conexionInicial = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    const dbName = process.env.DB_NAME || 'api_back_db';
    await conexionInicial.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await conexionInicial.end();

    // Crear el pool de conexiones
    const pool = crearPool();

    // Verificar que la conexión funciona
    const conexion = await pool.getConnection();
    console.log('✅ Conectado a la base de datos MySQL');
    conexion.release();

    // Inicializar las tablas
    await inicializarTablas(pool);

    return pool;
  } catch (error) {
    console.error('❌ Error al conectar con MySQL:', error.message);
    throw error;
  }
};

/**
 * Crea las tablas necesarias si no existen.
 */
const inicializarTablas = async (pool) => {
  // Tabla de usuarios
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Tabla de tareas con clave foránea al usuario
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) DEFAULT NULL,
      description TEXT NOT NULL,
      date DATETIME DEFAULT CURRENT_TIMESTAMP,
      user_id INT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  console.log('✅ Tablas inicializadas correctamente');
};

/**
 * Obtiene el pool de conexiones activo.
 */
export const getPool = () => {
  if (!pool) {
    throw new Error('El pool de MySQL no está inicializado. Llama a conectardb() primero.');
  }
  return pool;
};

export default conectardb;
