import express from 'express';
import { sequelize } from './config/database.js';
import tintaRoutes from './routes/TintaRoute.js';
import { setupSwagger } from './config/swagger.js';
import { connectToDatabase } from './config/database.js';

await connectToDatabase();

const app = express();
app.use(express.json());

setupSwagger(app);

app.get ("/health", async (req, res) => {
    
   try {
    await sequelize.authenticate();
    res.json ({
        status: 'ok',
        message: 'Banco de dados conectado',
        timestamp: new Date()
    })
   } catch (error) {
    res.status (500).json ({
        status: 'error',
        menssage: 'Erro ao conectar ao banco de dados',
        timestamp: new Date()
    })
   }
});
app.use(express.json());

app.use('/tintas', tintaRoutes);

app.get("/", (req, res) => {
    res.send ("Api rodando")
});

const startServer = async () => {
    try {
        await sequelize.authenticate();
            console.log("Conexão com o banco de dados estabelecida com sucesso.");

        app.listen (3000, () => {
            console.log ("Api rodando na porta 3000")
    });

    } catch (error) {
        console.error("Não foi possivel conectar ao banco de dados:", error);
    }
};

startServer();
