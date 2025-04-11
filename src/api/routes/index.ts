import { Router } from 'express';
import importarCsv from './importarCsv';
import boletos from './boletos';

const router = Router();
router.use('/importar-csv', importarCsv);
router.use('/boletos', boletos);
export default router;
