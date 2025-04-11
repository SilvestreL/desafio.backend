import { Request, Response } from 'express';
import { filtroBoletosSchema } from '../validators/boletosValidator';
import { gerarRelatorioPDFComFiltros, buscarBoletosComFiltro } from '../services/boletosService';
import { processarBoletosCSV } from '../services/importarBoletosService';
import Zod from 'zod';

export const listarBoletos = async (req: Request, res: Response) => {
  try {
    // Validação com Zod
    const filtros = filtroBoletosSchema.parse(req.query);

    if (filtros.relatorio === '1') {
      const base64 = await gerarRelatorioPDFComFiltros(filtros);
      return res.status(200).json({ relatorio: base64 });
    }

    const boletos = await buscarBoletosComFiltro(filtros);
    return res.status(200).json(boletos);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Erro ao listar boletos:', error.message);
    }

    // Erros de validação do Zod
    if (error instanceof Zod.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    return res.status(500).json({ error: 'Erro ao listar boletos.' });
  }
};

export const importarBoletos = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Arquivo CSV não enviado.' });
    }

    const resultado = await processarBoletosCSV(req.file.path);

    return res.status(201).json({
      message: 'Boletos importados com sucesso!',
      total: resultado.total,
    });
  } catch (error) {
    console.error('Erro ao importar boletos:', error);
    return res.status(500).json({ error: 'Erro ao importar boletos.' });
  }
};