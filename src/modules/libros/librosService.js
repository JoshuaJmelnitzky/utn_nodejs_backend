const { ProductDaoMongoDB } = require("./librosPersistence");

class BookService {
    constructor() {
        this.dao = new ProductDaoMongoDB();
    };   

    async getBooks() {
        return await this.dao.getBooks();
    };

    async getBookById(id) {
        return await this.dao.getBookById(id);
    };

    async saveBook(book) {
        return await this.dao.saveBook(book);
    };

    async updateBookById(id, book) {
        return await this.dao.updateBook(id, book);
    };

    async deleteBookById(id) {
        return await this.dao.deleteBook(id);
    };
};

module.exports = { BookService };