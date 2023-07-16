const mongoose = require("mongoose");
const { MONGO_CONNECTION } = process.env;

let connection = null;

class Database {
    constructor() {
        const config = {
            mongodb: {
                url: MONGO_CONNECTION,
                options: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            }
        };

        const connectMongo = () => {
            try {
                mongoose.connect(config.mongodb.url, config.mongodb.options);
                console.log("Conectado a mongo");
            } catch (e) {
                console.log("Error al conectarse a mongo", e)
            }
        };

        this.connection = connectMongo();
    }

    static getConnection() {
        if (!connection) connection = new Database();
        return connection;
    };
};

module.exports = { Database };