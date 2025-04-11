import PDFDocument from 'pdfkit';
import { Boleto } from '../infrastructure/db/models/boleto.model';
import { Buffer } from 'buffer';

export const gerarRelatorioBoletos = async (boletos: Boleto[]): Promise<string> => {
  const doc = new PDFDocument();
  const buffers: Uint8Array[] = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(18).text('Relatório de Boletos', { align: 'center' });
  doc.moveDown();

  boletos.forEach((boleto, index) => {
    doc.fontSize(12).text(`Boleto #${index + 1}`);
    doc.text(`Nome: ${boleto.nome_sacado}`);
    doc.text(`Valor: R$ ${boleto.valor}`);
    doc.text(`Lote: ${boleto.id_lote}`);
    doc.text(`Linha digitável: ${boleto.linha_digitavel}`);
    doc.moveDown();
  });

  doc.end();

  return new Promise((resolve) => {
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer.toString('base64'));
    });
  });
};