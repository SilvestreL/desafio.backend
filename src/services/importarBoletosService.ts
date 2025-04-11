import fs from 'fs';
import { parse } from 'csv-parse';
import { Request, Response } from 'express';
import db from '../infrastructure/db/models';

export const processarBoletosCSV = async (filePath: string): Promise<{ total: number }> => {
  const boletos: any[] = [];

  const parser = fs.createReadStream(filePath).pipe(
    parse({
      delimiter: ';',
      from_line: 2, // pula o cabeçalho
      trim: true,
    })
  );

  for await (const line of parser) {
    const [nome, unidade, valor, linha_digitavel] = line;

    const nomeLote = unidade.padStart(4, '0'); // ex: "17" → "0017"

    const lote = await db.Lote.findOne({ where: { nome: nomeLote } });

    if (!lote) {
      console.warn(`⚠️ Lote ${nomeLote} não encontrado para ${nome}. Ignorando.`);
      continue;
    }

    boletos.push({
      nome_sacado: nome,
      valor: parseFloat(valor),
      linha_digitavel,
      id_lote: lote.id,
      ativo: true,
      criado_em: new Date(),
    });
  }

  if (boletos.length > 0) {
    await db.Boleto.bulkCreate(boletos);
  }

  return { total: boletos.length };
};

export const importarBoletosCSV = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Arquivo CSV não enviado.' });
  }

  const filePath = req.file.path;

  try {
    const result = await processarBoletosCSV(filePath);
    return res.status(201).json({
      message: 'Boletos importados com sucesso!',
      total: result.total,
    });
  } catch (error) {
    console.error('Erro ao importar boletos:', error);
    return res.status(500).json({ error: 'Erro ao importar boletos.' });
  }
};