const { BookService } = require("./librosService");

const bookService = new BookService();

const getBooks = async (_, res) => {
    try {
        const allBooks = await bookService.getBooks();
        res.status(200).send(allBooks);
    } catch (e) {
        res.status(500).json({ "error": "Error al listar libros" });
    };
};

const getBookById = async (req, res) => {
    try {
        const findBook = await bookService.getBookById(req.params.id);

        if (!findBook) return res.status(404).send("Libro no encontrado");

        res.status(200).send(findBook);
    } catch (e) {
        res.status(500).json({ "error": "Error al buscar libro por id" });
    }
};

const saveBook = async (req, res) => {
    try {
        const addBook = await bookService.saveBook(req.body);
        res.status(201).send(addBook);
    } catch (e) {
        res.status(500).json({ "error": "Error al guardar el libro" });
    };
};

const updateBookById = async (req, res) => {
    try {
        const updateBook = await bookService.updateBookById(req.params.id, req.body);

        if (!updateBook) return res.status(404).send("Libro no encontrado");

        res.send(updateBook);
    } catch (e) {
        res.status(500).json({ "error": "Error al actualizar el libro" });
    };
};

const deleteBookById = async (req, res) => {
    try {
        const deleteBook = await bookService.deleteBookById(req.params.id);

        if (!deleteBook) return res.status(404).send("Libro no encontrado");

        res.send(deleteBook);
    } catch (e) {
        res.status(500).json({ "error": "Error al borrar el libro" });
    };
};

module.exports = {
    getBooks,
    getBookById,
    saveBook,
    updateBookById,
    deleteBookById
};