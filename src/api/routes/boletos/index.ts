import { Router } from 'express';
import { listarBoletos } from '../../../controllers/boletosController';

const router = Router();

/**
 * @swagger
 * /boletos:
 *   get:
 *     summary: Lista boletos com filtros opcionais ou gera relatório
 *     tags:
 *       - Boletos
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *         description: Nome do sacado (filtro)
 *       - in: query
 *         name: valor_inicial
 *         schema:
 *           type: number
 *         description: Valor mínimo
 *       - in: query
 *         name: valor_final
 *         schema:
 *           type: number
 *         description: Valor máximo
 *       - in: query
 *         name: id_lote
 *         schema:
 *           type: string
 *         description: ID do lote
 *       - in: query
 *         name: relatorio
 *         schema:
 *           type: string
 *           enum: [1]
 *         description: Se igual a "1", retorna o relatório PDF (base64)
 *     responses:
 *       200:
 *         description: Lista de boletos ou relatório em base64
 */
router.get('/', listarBoletos);

export default router;