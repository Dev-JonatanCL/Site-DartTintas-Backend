import { Router } from "express";
import tintaController from "../controllers/TintaController.js";

const router = Router();

router.get("/tintas", tintaController.listar);
router.get("/tintas/:id", tintaController.buscarPorId);
router.post("/tintas", tintaController.criarTinta);
router.put("/tintas/:id", tintaController.atualizarTinta);
router.delete("/tintas/:id", tintaController.deletarTinta);

export default router;