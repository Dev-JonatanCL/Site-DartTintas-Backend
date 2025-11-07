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

app.use(cors());

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('✅ Pasta /uploads criada em:', uploadsDir);
}

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

setupSwagger(app);

app.use('/tintas', tintaRoutes);
app.use('/auth', clienteRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API D\'art Tintas rodando!' });
});

const startServer = async () => {
  try {
    await connectToDatabase();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📚 Swagger: https://site-darttintas-backend.azurewebsites.net/api-docs`);
      console.log(`📁 Uploads em: ${uploadsDir}`);
    });
  } catch (error: any) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('⏹️ Encerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('⏹️ Encerrando servidor...');
  await sequelize.close();
  process.exit(0);
});

startServer();