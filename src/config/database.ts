import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: console.log,  
  define: {
    timestamps: true,
    underscored: true,
  },
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter: false});

    const Cliente = require('src\models\cliente.ts').default;
    const adminExists = await Cliente.findOne({ where: { email: 'admin@dart.com' } });
    if (!adminExists) {
      const bcrypt = require('bcryptjs');
      const hash = await bcrypt.hash('123456', 10);
      await Cliente.create({
        nome: 'Admin',
        email: 'admin@dart.com',
        senha: hash,
        rule: 'admin'
      });
      console.log('Admin criado: admin@dart.com / 123456');
    }

    // const Tinta = require('../models/Tinta').default;
    // const count = await Tinta.count();
    // if (count === 0) {
    //   const jsonPath = path.join(process.cwd(), 'data', 'tintas.json');
    //   if (fs.existsSync(jsonPath)) {
    //     const raw = fs.readFileSync(jsonPath, 'utf-8');
    //     const tintas = JSON.parse(raw);
    //     await Tinta.bulkCreate(tintas);
    //     console.log(`${tintas.length} tintas carregadas.`);
    //   }
    // }

  } catch (error) {
    console.error('Erro ao conectar ao banco:', error);
    throw error;
  }
};