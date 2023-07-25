require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./routes/routes");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorHandler);

const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${server.address().port}`);
});

