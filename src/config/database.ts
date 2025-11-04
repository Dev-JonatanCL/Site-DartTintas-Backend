import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const connectToDatabase = async () => {
  const dbPath = './database.sqlite';

  // Tenta deletar o banco com retry
  for (let i = 0; i < 5; i++) {
    try {
      if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath);
        console.log('Banco antigo apagado com sucesso.');
      }
      break;
    } catch (error: any) {
      if (error.code === 'EBUSY' || error.code === 'EPERM') {
        console.log(`Tentativa ${i + 1}/5: Banco ocupado, aguardando 1s...`);
        await delay(1000);
      } else {
        throw error;
      }
    }
  }

  try {
    // NÃO FECHE A CONEXÃO AQUI!
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    const Tinta = require('../models/Tinta').default;
    const Cliente = require('../models/Cliente').default;

    // Carrega tintas
    const jsonPath = path.join(process.cwd(), 'data', 'tintas.json');
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf-8');
      const tintas = JSON.parse(raw);
      await Tinta.bulkCreate(tintas);
      console.log(`${tintas.length} tintas carregadas.`);
    }

    // Cria admin
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('123456', 10);
    await Cliente.create({
      nome: 'Admin',
      email: 'admin@dart.com',
      senha: hash,
      rule: 'admin'
    });
    console.log('Admin criado: admin@dart.com / 123456');

  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    throw error; // Propaga o erro
  }
};