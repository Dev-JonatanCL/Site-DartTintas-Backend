import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.js";


class Tinta extends Model {
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
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    sequelize,
    modelName: "Tinta",
    tableName: "tintas"
});

export default Tinta;