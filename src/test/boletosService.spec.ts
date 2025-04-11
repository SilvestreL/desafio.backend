import * as boletosService from '../services/boletosService';
import db from '../infrastructure/db/models';
import { Op } from 'sequelize';

jest.mock('../infrastructure/db/models', () => {
    const { Op } = require('sequelize');
    return {
      Sequelize: { Op },
      Boleto: { findAll: jest.fn() },
      Lote: { findOne: jest.fn() },
    };
  });

describe('Boletos Service', () => {
  describe('buscarBoletosComFiltro', () => {
    it('deve retornar boletos filtrados pelo nome', async () => {
      const mockBoletos = [
        { nome_sacado: 'João', valor: 123.45, id_lote: 1 },
      ];
      (db.Boleto.findAll as jest.Mock).mockResolvedValue(mockBoletos);

      const result = await boletosService.buscarBoletosComFiltro({ nome: 'João' });

      expect(db.Boleto.findAll).toHaveBeenCalledWith({
        where: { nome_sacado: { [db.Sequelize.Op.like]: '%João%' } },
      });
      expect(result).toEqual(mockBoletos);
    });
  });

  describe('gerarRelatorioPDFComFiltros', () => {
    it('deve gerar um relatório em base64', async () => {
      const mockBoletos = [
        { nome_sacado: 'João', valor: 123.45, id_lote: 1, linha_digitavel: '123456789' },
      ];
      (db.Boleto.findAll as jest.Mock).mockResolvedValue(mockBoletos);

      const result = await boletosService.gerarRelatorioPDFComFiltros({ nome: 'João' });

      expect(result).toMatch(/^JVBER/); // Header padrão de qualquer PDF
    });
  });
});