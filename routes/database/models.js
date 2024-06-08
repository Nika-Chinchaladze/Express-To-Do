// imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Book schema
const bookSchema = new Schema({
    title: {
        require: true,
        type: String,
    },
    author: {
        require: true,
        type: String,
    },
    image: {
        require: true,
        type: String,
    },
    price: {
        require: true,
        type: Number,
    }
});

// Book model
const Book = mongoose.model("Book", bookSchema);

// exports
module.exports = { Book };
