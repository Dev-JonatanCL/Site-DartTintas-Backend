// src/controllers/TintaController.ts
import type { Request, Response } from 'express';
import Tinta from '../models/Tinta';
import upload from '../config/multer';
import { sequelize } from '../config/database';
export default {
  async listar(req: Request, res: Response) {
    const tintas = await Tinta.findAll();
    return res.json(tintas);
  },

  async buscarPorId(req: Request, res: Response) {
    const { id } = req.params;
    const tinta = await Tinta.findByPk(id);
    if (!tinta) return res.status(404).json({ error: 'Tinta não encontrada' });
    return res.json(tinta);
  },

  async criarTinta(req: Request, res: Response) {
    try {
      const {
        marca,
        descricao,
        acabamento,
        unidade_tamanho,
        cor_base,
        valor,
      } = req.body;

      if (!marca || !descricao || !acabamento || !unidade_tamanho || !cor_base || !valor) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser enviados' });
      }

      const image = req.file ? `../uploads/${req.file.filename}` : null;

      const valorNum = parseFloat(valor as string);
      if (isNaN(valorNum)) {
        return res.status(400).json({ error: 'Valor deve ser numérico' });
      }

      const novaTinta = await Tinta.create({
        marca,
        descricao,
        acabamento,
        unidade_tamanho,
        cor_base,
        valor: valorNum,
        image,
      });


      return res.status(201).json(novaTinta);
    } catch (err: any) {
      return res.status(500).json({
        error: 'Falha ao criar tinta',
        details: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
      });
    }
  },

  async atualizararTinta(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const tinta = await Tinta.findByPk(id);
      if (!tinta) return res.status(404).json({ error: 'Tinta não encontrada' });

      const campos: any = { ...req.body };
      if (req.file) campos.image = `../uploads/${req.file.filename}`;
      if (campos.valor) campos.valor = parseFloat(campos.valor);

      await tinta.update(campos);
      await tinta.reload();
      return res.json(tinta);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  },

  async deletarTinta(req: Request, res: Response) {
    const { id } = req.params;
    const tinta = await Tinta.findByPk(id);
    if (!tinta) return res.status(404).json({ error: 'Tinta não encontrada' });
    await tinta.destroy();
    return res.status(204).send();
  },
};