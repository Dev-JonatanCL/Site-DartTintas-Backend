import type { Request, Response } from 'express';
import Tinta from '../models/Tintas.js';

export default {
    async listar (req: Request, res: Response){
        const tintas = await Tinta.findAll();
        return res.json(tintas);
    },
    async buscarPorId (req: Request, res: Response){
        const { id } = req.params;
        const tintas = await Tinta.findByPk(id);
        if (!tintas){
            return res.status(400).json ({ error: 'Tinta não encontrada'});
        }
        return res.json(tintas);
    },
    async criarTinta (req: Request, res: Response){
        const { nome, cor, tipo, preco } = req.body;
        const novaTinta = await Tinta.create ({ nome, cor, tipo, preco});
        return res.status(201).json(novaTinta);
    },
    async atualizarTinta (req: Request, res: Response){
        const { id } = req.params;
        const { nome, cor, tipo, preco } = req.body;
        const tinta = await Tinta.findByPk(id);
        if (!tinta){
            return res.status(400).json ({ error: 'Tinta não encontrada'});
        }
        await tinta.update({ nome, cor, tipo, preco});
        return res.json(tinta);
    },
    async deletarTinta (req: Request, res: Response){
        const { id } = req.params;
        const tinta = await Tinta.findByPk(id);
        if (!tinta){
            return res.status(400).json ({ error: 'Tinta não encontrada'});
        }
        await tinta.destroy();
        return res.status(204).send();
    },
};