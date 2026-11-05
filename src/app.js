import express from "express";
import router from "./routes/auyhRouter.js";
import task from "./routes/taskroute.js";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const clientBuildPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../cliente/dist',
);

// Middlewares de seguridad
app.use(helmet({
  contentSecurityPolicy: false,
})); // Cabeceras básicas de seguridad con CSP deshabilitado para evitar errores en consola

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// Configuración CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5175'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use('/api', router)
app.use('/api', task)

app.use(express.static(clientBuildPath))
app.get('*', (req, res, next) => {
  if (req.path === '/api' || req.path.startsWith('/api/')) {
    return next()
  }

  res.sendFile(path.join(clientBuildPath, 'index.html'), (error) => {
    if (error) next(error)
  })
})

export default app;
