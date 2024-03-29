import { Router } from "express";
import { AvaliacaoController } from "../controllers/avaliacao.controller";
import { validaLoginMiddleware } from "../middlewares/login.middleware";

// http://localhost:3335/aluno/:id/avaliacao

export function avaliacaoRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const avaliacaoController = new AvaliacaoController();

    // Rotas de avaliação
    router.post("/", [validaLoginMiddleware], avaliacaoController.criarAvaliacao);
    router.get("/", [validaLoginMiddleware], avaliacaoController.listarAvaliacoes);
    router.put("/:idAvaliacao", [validaLoginMiddleware], avaliacaoController.atualizarAvaliacao);

    return router;
}