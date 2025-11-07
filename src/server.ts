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
    });
  } catch (error: any) {
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  await sequelize.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await sequelize.close();
  process.exit(0);
});

startServer();