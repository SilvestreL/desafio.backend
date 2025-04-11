import { DataTypes, Model, Sequelize, Optional } from 'sequelize';

interface BoletoAttributes {
  id?: number;
  nome_sacado: string;
  valor: number;
  linha_digitavel: string;
  id_lote: number;
  ativo: boolean;
  criado_em: Date;
}

type BoletoCreationAttributes = Optional<BoletoAttributes, 'id'>;

class Boleto extends Model<BoletoAttributes, BoletoCreationAttributes> implements BoletoAttributes {
  public id!: number;
  public nome_sacado!: string;
  public valor!: number;
  public linha_digitavel!: string;
  public id_lote!: number;
  public ativo!: boolean;
  public criado_em!: Date;
}

const initBoletoModel = (sequelize: Sequelize) => {
  Boleto.init(
    {
      nome_sacado: DataTypes.STRING,
      valor: DataTypes.DECIMAL,
      linha_digitavel: DataTypes.STRING,
      id_lote: DataTypes.INTEGER,
      ativo: DataTypes.BOOLEAN,
      criado_em: DataTypes.DATE,
    },
    {
      sequelize,
      tableName: 'boletos',
      modelName: 'Boleto',
      timestamps: false,
    }
  );

  return Boleto;
};

export { Boleto };
export default initBoletoModel;