import Express = require("express");

const app = Express();
app.use (Express.json());

app.get("/", (req, res) => {
    res.send ("Api rodando")
});

app.listen (3000, () => {
    console.log ("Api rodando na porta 3000")
})