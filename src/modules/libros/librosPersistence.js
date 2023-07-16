const { Database } = require("../../db/connection");
const { ClientMongoDB } = require("../../db/mongo");
const { bookSchema } = require("../../db/models/libro");

const connect = Database.getConnection();

class ProductDaoMongoDB {
    constructor() {
        this.clientMongoDB = new ClientMongoDB(bookSchema, connect);
    };

    async getBooks() {
        return await this.clientMongoDB.getAll();
    };

    async getBookById(id) {
        return await this.clientMongoDB.getById(id);
    };

    async saveBook(book) {
        return await this.clientMongoDB.save(book);
    };

    async updateBook(id, book) {
        return await this.clientMongoDB.updateById(id, book);
    };

    async deleteBook(id) {
        return await this.clientMongoDB.deleteById(id);
    };
};
 
module.exports = { ProductDaoMongoDB };