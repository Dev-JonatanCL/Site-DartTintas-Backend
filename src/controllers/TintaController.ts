import type { Request, Response } from 'express';
import Tinta from '../models/Tinta';
import upload from '../config/multer';

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
    const { marca, descricao, acabamento, unidade_tamanho, cor_base, valor } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image || null;

    const novaTinta = await Tinta.create({
      marca, descricao, acabamento, unidade_tamanho, cor_base, valor, image
    });
    return res.status(201).json(novaTinta);
  },

  async atualizararTinta(req: Request, res: Response) {
    const { id } = req.params;
    const campos = req.body;
    if (req.file) campos.image = `/uploads/${req.file.filename}`;

    const tinta = await Tinta.findByPk(id);
    if (!tinta) return res.status(404).json({ error: 'Tinta não encontrada' });

    await tinta.update(campos);
    return res.json(tinta);
  },

  async deletarTinta(req: Request, res: Response) {
    const { id } = req.params;
    const tinta = await Tinta.findByPk(id);
    if (!tinta) return res.status(404).json({ error: 'Tinta não encontrada' });
    await tinta.destroy();
    return res.status(204).send();
  }
};
