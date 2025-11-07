import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
});

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    const Cliente = require("../models/Cliente").default;
    const bcrypt = require('bcryptjs');
    const hash = await bcrypt.hash('123456', 10);
    await Cliente.create({
      nome: 'Admin',
      email: 'admin@dart.com',
      senha: hash,
      rule: 'admin'
    });

    const Tinta = require('../models/Tinta').default;
    const jsonPath = path.join(process.cwd(), 'data', 'tintas.json');
    
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf-8');
      const tintas = JSON.parse(raw);
      await Tinta.bulkCreate(tintas);
    }

  } catch (error) {
    throw error;
  }
};