import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { sequelize, connectToDatabase } from './config/database';
import tintaRoutes from './routes/TintaRoute';
import clienteRouter from './routes/ClienteRoute';
import { setupSwagger } from './config/swagger';

const app = express();
app.use(cors({
  origin: '*',           // ← LIBERA TUDO
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Pasta /uploads criada');
}

app.use(express.json());
app.use('/uploads', express.static('uploads'));

setupSwagger(app);

app.use('/tintas', tintaRoutes);
app.use('/auth', clienteRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API D\'art Tintas rodando!' });
});

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('Banco conectado e tabelas sincronizadas!');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`API rodando em https://site-darttintas-backend.azurewebsites.net`);
      console.log(`Swagger: https://site-darttintas-backend.azurewebsites.net/api-docs`);
    });
  } catch (error: any) {
    console.error('Falha ao iniciar o servidor:', error.message || error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('\nEncerrando servidor...');
  await sequelize.close();
  console.log('Conexão com banco fechada.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await sequelize.close();
  process.exit(0);
});

startServer();