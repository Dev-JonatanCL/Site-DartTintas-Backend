import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Tinta extends Model {}

Tinta.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    marca: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING, allowNull: false },
    acabamento: { type: DataTypes.STRING, allowNull: false },
    unidade_tamanho: { type: DataTypes.STRING, allowNull: false },
    cor_base: { type: DataTypes.STRING, allowNull: false },
    valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true }
  },
  {
    sequelize,
    modelName: 'Tinta',
    tableName: 'tintas'
  }
);

export default Tinta;