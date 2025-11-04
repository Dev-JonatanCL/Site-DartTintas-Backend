import { Router } from "express";
import TintaController from "../controllers/TintaController";
import upload from "../config/multer";

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
 *         marca:
 *           type: string
 *           example: LUKSCOLOR
 *         descricao:
 *           type: string
 *           example: ESMALTE SINTETICO
 *         acabamento:
 *           type: string
 *           example: FOSCO
 *         unidade_tamanho:
 *           type: string
 *           example: 0.9 ML
 *         cor_base:
 *           type: string
 *           example: BRANCO
 *         valor:
 *           type: number
 *           example: 21.89
 *         image:
 *           type: string
 *           example: /uploads/ESMALTE.jpg
 */

/**
 * @swagger
 * /tintas:
 *   get:
 *     summary: Lista todas as tintas
 *     tags: [Tintas]
 *     responses:
 *       200:
 *         description: Lista de tintas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tinta'
 */
router.get('/', TintaController.listar);

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
router.get("/:id", TintaController.buscarPorId);

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
 *             required:
 *               - marca
 *               - descricao
 *               - acabamento
 *               - unidade_tamanho
 *               - cor_base
 *               - valor
 *               - imagem
 *             properties:
 *               marca:
 *                 type: string
 *                 example: LUKSCOLOR
 *               descricao:
 *                 type: string
 *                 example: ESMALTE SINTETICO
 *               acabamento:
 *                 type: string
 *                 example: FOSCO
 *               unidade_tamanho:
 *                 type: string
 *                 example: 0.9 ML
 *               cor_base:
 *                 type: string
 *                 example: BRANCO
 *               valor:
 *                 type: number
 *                 example: 21.89
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tinta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tinta'
 *       400:
 *         description: Dados inválidos
 */
router.post("/", upload.single("imagem"), TintaController.criarTinta);

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
 *               marca:
 *                 type: string
 *                 example: LUKSCOLOR
 *               descricao:
 *                 type: string
 *                 example: TINTA ACRILICA PREMIUM
 *               acabamento:
 *                 type: string
 *                 example: ACETINADO
 *               unidade_tamanho:
 *                 type: string
 *                 example: 3.6 L
 *               cor_base:
 *                 type: string
 *                 example: BRANCO
 *               valor:
 *                 type: number
 *                 example: 89.90
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tinta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tinta'
 *       404:
 *         description: Tinta não encontrada
 */
router.put("/:id", upload.single("imagem"), TintaController.atualizararTinta);

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
router.delete("/:id", TintaController.deletarTinta);

export default router;