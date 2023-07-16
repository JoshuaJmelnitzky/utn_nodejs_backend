const { BookService } = require("./librosService");

const bookService = new BookService();

const getBooks = async (_, res, next) => {
    try {
        const allBooks = await bookService.getBooks();
        
        res.status(200).json(allBooks);
    } catch (e) {
        next(e);
    };
};

const getBookById = async (req, res, next) => {
    try {
        const findBook = await bookService.getBookById(req.params.id);

        res.status(200).json(findBook);
    } catch (e) {
        next(e);
    };
};

const saveBook = async (req, res, next) => {
    try {
        const addBook = await bookService.saveBook(req.body);

        res.status(201).json(addBook);
    } catch (e) {
        next(e);
    };
};

const updateBookById = async (req, res, next) => {
    try {
        const updateBook = await bookService.updateBookById(req.params.id, req.body);

        res.status(200).json(updateBook);
    } catch (e) {
        next(e);
    };
};

const deleteBookById = async (req, res, next) => {
    try {
        const deleteBook = await bookService.deleteBookById(req.params.id);

        res.status(200).json(deleteBook);
    } catch (e) {
        next(e);
    };
};

module.exports = {
    getBooks,
    getBookById,
    saveBook,
    updateBookById,
    deleteBookById
};