import { Router } from 'express';
import { importarBoletos } from '../../controllers/boletosController';
import { upload } from '../middlewares/upload';

const router = Router();

/**
 * @swagger
 * /importar-csv:
 *   post:
 *     summary: Importa boletos via arquivo CSV
 *     tags:
 *       - Boletos
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo CSV contendo os boletos
 *     responses:
 *       201:
 *         description: Boletos importados com sucesso
 *       400:
 *         description: Erro ao importar boletos
 */
router.post('/', upload.single('file'), importarBoletos)

export default router;