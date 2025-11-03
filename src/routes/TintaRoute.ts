import { Router } from "express";
import tintaController from "../controllers/TintaController.js";
import upload from "../config/multer.js"; // importa a config do multer

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tintas
 *   description: Endpoints para gerenciamento das tintas disponíveis na loja
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tinta:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Tinta Azul Premium
 *         tipo:
 *           type: string
 *           example: Acrílica
 *         preco:
 *           type: number
 *           example: 89.90
 *         imagem:
 *           type: string
 *           example: /uploads/1730023123456.png
 *     TintaInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: Tinta Azul Premium
 *         tipo:
 *           type: string
 *           example: Acrílica
 *         preco:
 *           type: number
 *           example: 89.90
 */

/**
 * @swagger
 * /tintas:
 *   get:
 *     summary: Lista todas as tintas cadastradas
 *     tags: [Tintas]
 *     responses:
 *       200:
 *         description: Lista de tintas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tinta'
 */
router.get("/", tintaController.listar);

/**
 * @swagger
 * /tintas/{id}:
 *   get:
 *     summary: Busca uma tinta pelo ID
 *     tags: [Tintas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da tinta
 *     responses:
 *       200:
 *         description: Tinta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tinta'
 *       404:
 *         description: Tinta não encontrada
 */
router.get("/:id", tintaController.buscarPorId);

/**
 * @swagger
 * /tintas:
 *   post:
 *     summary: Cria uma nova tinta com imagem
 *     tags: [Tintas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: LucksColor
 *               cor:
 *                 type: string
 *                 example: Azul
 *               tipo:
 *                 type: string
 *                 example: Acrílica
 *               preco:
 *                 type: number
 *                 example: 89.90
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tinta criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", upload.single("imagem"), tintaController.criarTinta);

/**
 * @swagger
 * /tintas/{id}:
 *   put:
 *     summary: Atualiza os dados de uma tinta (pode incluir nova imagem)
 *     tags: [Tintas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tinta a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: LucksColor
 *               cor:
 *                 type: string
 *                 example: Vermelho
 *               tipo:
 *                 type: string
 *                 example: Epóxi
 *               preco:
 *                 type: number
 *                 example: 99.90
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tinta atualizada com sucesso
 *       404:
 *         description: Tinta não encontrada
 */
router.put("/:id", upload.single("imagem"), tintaController.atualizarTinta);

/**
 * @swagger
 * /tintas/{id}:
 *   delete:
 *     summary: Remove uma tinta do sistema
 *     tags: [Tintas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tinta a ser removida
 *     responses:
 *       204:
 *         description: Tinta removida com sucesso
 *       404:
 *         description: Tinta não encontrada
 */
router.delete("/:id", tintaController.deletarTinta);

export default router;
