const express = require("express");
const route = express.Router();
const { getBooks, getBookById, saveBook, updateBookById, deleteBookById } = require('./librosController');

route.get("/", getBooks);
route.get("/:id", getBookById);
route.post("/", saveBook);
route.put("/:id", updateBookById);
route.delete("/:id", deleteBookById);

module.exports = route;