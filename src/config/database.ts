import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false, // Reduz logs em produção
  define: {
    timestamps: true,
    underscored: true,
  },
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao SQLite');
    
    // Força recriar tabelas no Azure (já que o DB é efêmero)
    await sequelize.sync({ force: true });
    console.log('✅ Tabelas sincronizadas');

    // Criar admin
    const Cliente = require("../models/Cliente").default;
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('123456', 10);
    await Cliente.create({
      nome: 'Admin',
      email: 'admin@dart.com',
      senha: hash,
      rule: 'admin'
    });
    console.log('✅ Admin criado: admin@dart.com / 123456');

    // Popular tintas do JSON
    const Tinta = require('../models/Tinta').default;
    const jsonPath = path.join(process.cwd(), 'data', 'tintas.json');
    
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf-8');
      const tintas = JSON.parse(raw);
      await Tinta.bulkCreate(tintas);
      console.log(`✅ ${tintas.length} tintas carregadas do JSON`);
    } else {
      console.warn('⚠️ Arquivo tintas.json não encontrado em:', jsonPath);
    }

  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
    throw error;
  }
};