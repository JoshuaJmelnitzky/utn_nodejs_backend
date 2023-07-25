const express = require("express");
const route = express.Router();
const { getBooks, getBookById, saveBook, updateBookById, deleteBookById } = require('./librosController');
const { requiredScopes } = require("express-oauth2-jwt-bearer");

route.get("/", requiredScopes("read:productos"), getBooks);
route.get("/:id", requiredScopes("read:productos"), getBookById);
route.post("/", requiredScopes("write:productos"), saveBook);
route.put("/:id", requiredScopes("read:productos"), updateBookById);
route.delete("/:id", requiredScopes("read:productos"), deleteBookById);

module.exports = route; 