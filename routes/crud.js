const express = require("express");
const { Book } = require("./database/models");

// setup router
const router = express.Router();

// columns
const COLUMNS = ["title", "author", "price", "image"];

// ================================== crud operations ================================== //
// [done]
router.get("/books", async (req, res) => {
    const books = await Book.find().select(COLUMNS);
    return res.status(200).json({
        data: books,
    })
});

// [done]
router.get("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.where({ _id: bookId }).findOne().select(COLUMNS);
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        return res.status(200).json({
            data: book,
        })
    }
});

// [done]
router.post("/books", async (req, res) => {
    const newBook = new Book(req.body);
    await newBook.save();
    return res.status(201).json({
        message: "New book has been added successfully",
        book: newBook,
    })
});

// [done]
router.put("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.where({ _id: bookId }).findOne();
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        const { title, author, image, price } = req.body;
        book.title = title;
        book.author = author;
        book.image = image;
        book.price = price;
        book.save();
        return res.status(201).json({
            message: "Book has been updated successfully",
            book: book,
        });
    }
});

// [done]
router.patch("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.where({ _id: bookId }).findOne();
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        const fieldName = req.query.fieldName.trim().toLowerCase();
        const fieldValue = req.query.fieldValue;

        if (!COLUMNS.includes(fieldName) || !fieldValue) {
            return res.status(404).send("Bad request - fieldName isn't allowed!");
        }

        book[fieldName] = fieldValue;
        book.save();
        return res.status(201).json({
            message: "Book has been modified successfully",
            book: book,
        });
    }
});

// [done]
router.delete("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await Book.where({ _id: bookId }).findOne();
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        await Book.deleteOne({ _id: bookId });
        return res.status(200).json({
            message: "Book has been deleted successfully",
            book: book,
        });
    }
});

// exports
module.exports = router;
