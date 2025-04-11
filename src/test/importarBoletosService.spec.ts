import * as importarBoletosService from '../services/importarBoletosService';
import db from '../infrastructure/db/models';
import { Readable } from 'stream';
import fs from 'fs';

// Mocks
jest.mock('fs');
jest.mock('../infrastructure/db/models', () => {
  const { Op } = require('sequelize');
  return {
    Sequelize: { Op },
    Boleto: {
      findAll: jest.fn(),
      bulkCreate: jest.fn(),
    },
    Lote: {
      findOne: jest.fn(),
    },
  };
});

describe('Importar Boletos Service', () => {
  it('deve processar boletos de um arquivo CSV', async () => {
    const csvMockContent = `nome;unidade;valor;linha_digitavel
João;17;100.50;123456789012345678901234567890123456789012345
`;

    // Simulando leitura de stream do CSV
    (fs.createReadStream as jest.Mock).mockReturnValueOnce(Readable.from([csvMockContent]));

    const mockLote = { id: 1 };
    (db.Lote.findOne as jest.Mock).mockResolvedValue(mockLote);
    (db.Boleto.bulkCreate as jest.Mock).mockResolvedValue([]);

    const result = await importarBoletosService.processarBoletosCSV('mock/path.csv');

    expect(db.Lote.findOne).toHaveBeenCalledWith({ where: { nome: '0017' } });
    expect(db.Boleto.bulkCreate).toHaveBeenCalledWith([
      {
        nome_sacado: 'João',
        valor: 100.5,
        linha_digitavel: '123456789012345678901234567890123456789012345',
        id_lote: 1,
        ativo: true,
        criado_em: expect.any(Date),
      },
    ]);
    expect(result).toEqual({ total: 1 });
  });
});