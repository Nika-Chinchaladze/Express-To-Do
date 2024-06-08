// imports
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Challenge model & schema
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

const Book = mongoose.model("Book", bookSchema);

// exports
module.exports = { Book };
