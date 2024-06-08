// imports
const express = require("express");
const { 
    getBooks,
    getBookById,
    postBook,
    putBook,
    patchBook,
    deleteBook
 } = require("./database/actions");

// setup router
const router = express.Router();

// ================================== crud operations ================================== //
// [done]
router.get("/books", async (req, res) => {
    const books = await getBooks();
    return res.status(200).json({
        data: books,
    })
});

// [done]
router.get("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await getBookById(bookId)
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
    const newBook = await postBook(req.body);
    return res.status(201).json({
        message: "New book has been added successfully",
        book: newBook,
    })
});

// [done]
router.put("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await getBookById(bookId);
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        await putBook(bookId, req.body);
        return res.status(201).json({
            message: "Book has been updated successfully"
        });
    }
});

// [done]
router.patch("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await getBookById(bookId);
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        const fieldName = req.query.fieldName.trim().toLowerCase();
        const fieldValue = req.query.fieldValue;

        if (!COLUMNS.includes(fieldName)) {
            return res.status(404).send("Bad request - fieldName isn't allowed!");
        } else if (!fieldValue) {
            return res.status(404).send("Bad request - fieldValue must be provided!");
        } else {
            await patchBook(bookId, fieldName, fieldValue);
        }
        
        return res.status(201).json({
            message: "Book has been modified successfully"
        });
    }
});

// [done]
router.delete("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await getBookById(bookId)
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        await deleteBook(bookId);
        return res.status(200).json({
            message: "Book has been deleted successfully"
        });
    }
});

// exports
module.exports = router;
