import Cliente from '../models/cliente';
import bcrypt from 'bcryptjs';

export const ClienteService = {
  async login(email: string, senha: string) {
    const cliente = await Cliente.findOne({ where: { email } });
    if (!cliente) throw new Error('Usuário não encontrado');

    const valido = await bcrypt.compare(senha, cliente.senha);
    if (!valido) throw new Error('Senha incorreta');

    return cliente;
  },

  async register(nome: string, email: string, senha: string) {
    const hash = await bcrypt.hash(senha, 10);
    try {
      return await Cliente.create({ nome, email, senha: hash, rule: 'user' });
    } catch (error: any) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('Email já cadastrado');
      }
      throw error;
    }
  }
};