// imports
const { Book } = require("./models");

// columns
const COLUMNS = ["title", "author", "price", "image"];

// GET - all books
async function getBooks() {
    const books = await Book.find().select(COLUMNS);
    return books;
}

// GET - book by id
async function getBookById(bookId) {
    const book = await Book.where({ _id: bookId }).findOne().select(COLUMNS);
    return book;
}

// POST - add new book
async function postBook(data) {
    const newBook = new Book(data);
    await newBook.save();
    return newBook;
}

// PUT - update book
async function putBook(bookId, data) {
    const { title, author, image, price } = data;
    const book = await Book.updateOne(
        { _id: bookId },
        { title: title, author: author, image: image, price: price },
        { new: true, runValidators: true },
    );
    return;
}

// PATCH - modify book
async function patchBook(bookId, fieldName, fieldValue) {
    const book = await Book.where({ _id: bookId }).findOne(); 
    book[fieldName] = fieldValue;
    book.save();
    return;
}

// DELETE - remove book by id
async function deleteBook(bookId) {
    await Book.deleteOne({ _id: bookId });
    return;
}

// exports
module.exports = { getBooks, getBookById, postBook, putBook, patchBook, deleteBook };
