import { sequelize } from '../infrastructure/db/models';

export default async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado ao banco de dados com sucesso!');
  } catch (err) {
    console.error('🔴 Erro ao conectar com o banco de dados:', err);
    process.exit(1);
  }
};