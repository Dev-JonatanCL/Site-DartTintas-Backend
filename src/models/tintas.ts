import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";

class Tinta extends Model {

    public id!: number;
    public nome!: string;
    public cor!: string;
    public tipo!: string;
    public preco!: number;
}

Tinta.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "Tinta"
});

export default Tinta;