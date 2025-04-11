import db from '../infrastructure/db/models';
import { Op } from 'sequelize';
import { gerarRelatorioBoletos } from './gerarRelatorioService';

// Tipagem básica da query
interface FiltroBoletos {
  nome?: string;
  valor_inicial?: string;
  valor_final?: string;
  id_lote?: string;
}

export const gerarRelatorioPDFComFiltros = async (
  { nome, valor_inicial, valor_final, id_lote }: FiltroBoletos
): Promise<string> => {
  const where: any = {};

  if (nome) where.nome_sacado = { [Op.like]: `%${nome}%` };
  if (valor_inicial) where.valor = { ...(where.valor || {}), [Op.gte]: Number(valor_inicial) };
  if (valor_final) where.valor = { ...(where.valor || {}), [Op.lte]: Number(valor_final) };
  if (id_lote) where.id_lote = id_lote;

  // 🧠 Busca os boletos com base nos filtros
  const boletos = await db.Boleto.findAll({ where });

  // 🧾 Gera o relatório em base64
  return gerarRelatorioBoletos(boletos);
};

interface FiltroBoletosQuery {
  nome?: string;
  valor_inicial?: string;
  valor_final?: string;
  id_lote?: string;
}

export const buscarBoletosComFiltro = async (query: FiltroBoletosQuery) => {
  const where: any = {};

  if (query.nome) where.nome_sacado = { [Op.like]: `%${query.nome}%` };
  if (query.valor_inicial) where.valor = { ...(where.valor || {}), [Op.gte]: Number(query.valor_inicial) };
  if (query.valor_final) where.valor = { ...(where.valor || {}), [Op.lte]: Number(query.valor_final) };
  if (query.id_lote) where.id_lote = query.id_lote;

  return db.Boleto.findAll({ where });
};