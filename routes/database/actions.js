// imports
const { Book } = require("./models");

// columns
const COLUMNS = ["title", "author", "price", "image"];

// GET - all books
const getBooks = async () => {
    const books = await Book.find().select(COLUMNS);
    return books;
}

// GET - book by id
const getBookById = async (bookId) => {
    const book = await Book.where({ _id: bookId }).findOne().select(COLUMNS);
    return book;
}

// POST - add new book
const postBook = async (data) => {
    const newBook = new Book(data);
    await newBook.save();
    return newBook;
}

// PUT - update book
const putBook = async (bookId, data) => {
    const { title, author, image, price } = data;
    const book = await Book.updateOne(
        { _id: bookId },
        { title: title, author: author, image: image, price: price },
        { new: true, runValidators: true },
    );
    
    if (book.modifiedCount > 0) {
        return true;
    } else {
        return false;
    }
}

// PATCH - modify book
const patchBook = async (bookId, fieldName, fieldValue) => {
    const book = await Book.where({ _id: bookId }).findOne(); 
    book[fieldName] = fieldValue;
    book.save();
    return true;
}

// DELETE - remove book by id
const deleteBook = async (bookId) => {
    await Book.deleteOne({ _id: bookId });
    return true;
}

// exports
module.exports = { getBooks, getBookById, postBook, putBook, patchBook, deleteBook, COLUMNS };
