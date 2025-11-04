import type { Request, Response } from 'express';
import { ClienteService } from '../service/ClienteService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_muito_forte_123456789';

// POST /auth/login
export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: 'Email e senha são obrigatórios' });
  }

  try {
    const cliente = await ClienteService.login(email, senha);

    const token = jwt.sign(
      { id: cliente.id, email: cliente.email, rule: cliente.rule },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      usuario: {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        rule: cliente.rule
      }
    });
  } catch (error: any) {
    res.status(401).json({ erro: error.message });
  }
};

// POST /auth/register
export const register = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
  }

  try {
    const cliente = await ClienteService.register(nome, email, senha);
    res.status(201).json({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      rule: cliente.rule
    });
  } catch (error: any) {
    res.status(400).json({ erro: error.message });
  }
};