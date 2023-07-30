require('dotenv').config();
const { getBooks, getBookById, saveBook, updateBookById } = require('../../src/modules/libros/librosController');
const { bookSchema } = require('../../src/db/models/libro');

jest.mock('../../src/db/models/libro');

describe("Libro Controller", () => {
    let mockRes;

    beforeEach(() => {
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("getBooks debería obtener todos los libros", async () => {
        const mockLibros = [
            { titulo: "Book 1", autor: "Author 1" },
            { titulo: "Book 2", autor: "Author 2" },
        ];

        bookSchema.find.mockResolvedValue(mockLibros);

        const mockReq = {};

        await getBooks(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibros);
    });


    test("getBookById debería obtener un libro", async () => {
        const mockLibro = { _id: "64c2be6f00801ae1847ae73d", titulo: "Libro Encontrado", autor: "Juan Perez" };

        bookSchema.findById.mockResolvedValue(mockLibro);

        const mockReq = { params: { id: "64c2be6f00801ae1847ae73d" } };
        const next = jest.fn();

        await getBookById(mockReq, mockRes, next);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibro);
    });


    test("createLibro debería crear un nuevo libro", async () => {
        const mockLibro = { titulo: "Nuevo Libro", autor: "Juan Perez" };

        mockLibro.save = jest.fn().mockResolvedValue({ _id: "64c2be6f00801ae1847ae73e", ...mockLibro });

        bookSchema.create.mockResolvedValue(mockLibro);

        const mockReq = { body: mockLibro };

        await saveBook(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({ _id: "64c2be6f00801ae1847ae73e", ...mockLibro });
    });

    test("updateLibro debería actualizar un libro existente", async () => {
        const libroId = '1';
        const libroActualizado = { titulo: 'Libro Actualizado', autor: 'Autor Actualizado' };

        const libroActualizadoMock = { _id: libroId, ...libroActualizado };
        bookSchema.findByIdAndUpdate.mockResolvedValue(libroActualizadoMock);

        const mockReq = { params: { id: "1" }, body: libroActualizado };

        await updateBookById(mockReq, mockRes);

        expect(bookSchema.findByIdAndUpdate).toHaveBeenCalledWith(libroId, libroActualizado, { new: true });
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(libroActualizadoMock);
    });

    test("deleteLibro debería eliminar un libro existente", async () => {
        const mockLibroEliminado = { titulo: 'Libro Eliminado', autor: 'Autor Eliminado' };
        libroModel.findByIdAndRemove.mockResolvedValue(mockLibroEliminado);
        const mockReq = { params: { id: "1" } };

        await deleteLibro(mockReq, mockRes);

        expect(libroModel.findByIdAndRemove).toHaveBeenCalledWith(mockReq.params.id);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith(mockLibroEliminado);
    });
});