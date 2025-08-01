import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import cors from 'cors';

import connectDB from './Config/DataBase.js';
connectDB();

const mtpd = express();
mtpd.use(json());
mtpd.use(cors({
  origin: 'http://localhost:3000', // o donde tengas el frontend
  credentials: true
}));

import authRoutes from './Routes/Auth.Route.js';
mtpd.use('/api/auth', authRoutes);

import cursoRoutes from './Routes/Curso.Route.js';
mtpd.use('/api/curso', cursoRoutes);

import { swaggerUi, swaggerSpec } from './Config/swagger.js';
mtpd.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 4195;
mtpd.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});