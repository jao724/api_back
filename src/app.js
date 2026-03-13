import express from "express";
import router from "./routes/auyhRouter.js";
import task from "./routes/taskroute.js";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

const app = express();

// Security Middlewares
app.use(helmet()); // Basic security headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// CORS configuration reflecting security skill
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:5175'], // Restrict to front-end dev urls
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));


app.use('/api', router)
app.use('/api', task)

export default app;




