import { Sequelize } from 'sequelize'
export const sequelize = new Sequelize ({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log ('Banco de dados conectado com sucesso!'); 
    } catch (error) {
        console.error ('Erro ao conectar ao banco de dados:', error);
    }
}
