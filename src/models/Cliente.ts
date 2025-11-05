import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

interface ClienteAttributes {
  id: number;
  nome: string;
  email: string;
  senha: string;
  rule: 'admin' | 'user';
}

interface ClienteCreationAttributes extends Optional<ClienteAttributes, 'id'> {}

class Cliente extends Model<ClienteAttributes, ClienteCreationAttributes> implements ClienteAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public rule!: 'admin' | 'user';
}

Cliente.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    senha: { type: DataTypes.STRING, allowNull: false },
    rule: { type: DataTypes.ENUM('admin', 'user'), allowNull: false, defaultValue: 'user' }
  },
  {
    sequelize,
    modelName: 'Cliente',
    tableName: 'users',
    timestamps: false,
    underscored: false
  }
);

export default Cliente;
