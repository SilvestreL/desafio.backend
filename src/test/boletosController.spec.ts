import { Request, Response } from 'express';
import { listarBoletos, importarBoletos } from '../controllers/boletosController';
import * as boletosService from '../services/boletosService';
import * as importarBoletosService from '../services/importarBoletosService';
import { Op } from 'sequelize';

jest.mock('../services/boletosService');
jest.mock('../services/importarBoletosService');
jest.mock('../infrastructure/db/models', () => {
    const { Op } = require('sequelize');
    return {
      Sequelize: { Op },
      Boleto: { findAll: jest.fn() },
      Lote: { findOne: jest.fn() },
    };
  });

describe('Boletos Controller', () => {
  describe('listarBoletos', () => {
    it('deve retornar boletos filtrados', async () => {
      const req = {
        query: { nome: 'João' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      const mockBoletos = [
        { nome_sacado: 'João', valor: 123.45, id_lote: 1 },
      ];
      (boletosService.buscarBoletosComFiltro as jest.Mock).mockResolvedValue(mockBoletos);

      await listarBoletos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockBoletos);
    });

    it('deve retornar erro de validação para filtros inválidos', async () => {
      const req = {
        query: { valor_inicial: 'abc' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await listarBoletos(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(Array) }));
    });
  });

  describe('importarBoletos', () => {
    it('deve importar boletos com sucesso', async () => {
      const req = {
        file: { path: 'mock/path.csv' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (importarBoletosService.processarBoletosCSV as jest.Mock).mockResolvedValue({ total: 3 });

      await importarBoletos(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Boletos importados com sucesso!',
        total: 3,
      });
    });

    it('deve retornar erro se o arquivo não for enviado', async () => {
      const req = {} as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await importarBoletos(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Arquivo CSV não enviado.' });
    });
  });
});