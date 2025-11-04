import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface TintaAttributes {
  id: number;
  marca: string;
  descricao: string;
  acabamento: string;
  unidade_tamanho: string;
  cor_base: string;
  valor: number;
  image: string | null;
}

interface TintaCreationAttributes extends Optional<TintaAttributes, 'id'> {}

class Tinta extends Model<TintaAttributes, TintaCreationAttributes> implements TintaAttributes {
  public id!: number;
  public marca!: string;
  public descricao!: string;
  public acabamento!: string;
  public unidade_tamanho!: string;
  public cor_base!: string;
  public valor!: number;
  public image!: string | null;
}

Tinta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marca: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: false },
    acabamento: { type: DataTypes.STRING, allowNull: false },
    unidade_tamanho: { type: DataTypes.STRING, allowNull: false },
    cor_base: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: 'Tinta',
    tableName: 'tintas',
    timestamps: false,   
    underscored: false,
  }
);

export default Tinta;