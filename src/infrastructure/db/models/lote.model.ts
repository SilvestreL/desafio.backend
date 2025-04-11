import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize) => {
  const Lote = sequelize.define(
    'Lote',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      criado_em: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: 'lotes',
      timestamps: false, // Se você não estiver usando `createdAt/updatedAt`
    }
  );

  return Lote;
};