'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('lotes', [
      { nome: '0017', ativo: true, criado_em: new Date() },
      { nome: '0018', ativo: true, criado_em: new Date() },
      { nome: '0019', ativo: true, criado_em: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('lotes', {
      nome: ['0017', '0018', '0019'],
    });
  },
};
