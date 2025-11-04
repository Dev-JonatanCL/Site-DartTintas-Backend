import 'dotenv/config';
import express from 'express';
import { sequelize, connectToDatabase } from './config/database';
import tintaRoutes from './routes/TintaRoute';
import clienteRouter from './routes/ClienteRoute';
import { setupSwagger } from './config/swagger';

// Associa modelos
const Tinta = require('./models/Tinta').default;
const Cliente = require('./models/Cliente').default;
Tinta.init(Tinta.getAttributes(), { ...Tinta.options, sequelize });
Cliente.init(Cliente.getAttributes(), { ...Cliente.options, sequelize });

const app = express();
app.use(express.json());
setupSwagger(app);

app.use('/uploads', express.static('uploads'));
app.use('/tintas', tintaRoutes);
app.use('/auth', clienteRouter);
app.get('/', (req, res) => res.send('API rodando'));

const startServer = async () => {
  try {
    await connectToDatabase(); // APAGA E RECRIA
    console.log('Banco recriado com sucesso!');

    app.listen(3000, () => {
      console.log('API rodando na porta 3000');
    });
  } catch (error) {
    console.error('Falha ao iniciar servidor:', error);
    process.exit(1);
  }
};

// FECHA A CONEXÃO APENAS AO ENCERRAR
process.on('SIGINT', async () => {
  console.log('\nEncerrando...');
  await sequelize.close();
  console.log('Conexão com banco fechada.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await sequelize.close();
  process.exit(0);
});

startServer();