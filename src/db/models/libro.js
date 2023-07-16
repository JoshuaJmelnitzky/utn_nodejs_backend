const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true }
});

const bookSchema = mongoose.model("libro", bookModel);

module.exports = { bookSchema };