// imports
const express = require("express");

// db actions
const act = require("./database/actions");

// setup router
const router = express.Router();


// ================================== crud operations ================================== //
// [done ... tested]
router.get("/books", async (req, res) => {
    const books = await act.getBooks();
    return res.status(200).json({
        data: books,
    })
});

// [done ... tested]
router.get("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await act.getBookById(bookId);
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        return res.status(200).json({
            data: book,
        })
    }
});

// [done ... tested]
router.post("/books", async (req, res) => {
    const { title, author, image, price } = req.body;
    if (!title || !author || !image || !price) {
        return res.status(404).send("Bad Request - all fields must be provided!");
    }

    const newBook = await act.postBook(req.body);
    return res.status(201).json({
        message: "New book has been added successfully",
        book: newBook,
    })
});

// [done ... tested]
router.put("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await act.getBookById(bookId);
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        const { title, author, image, price } = req.body;
        if (!title || !author || !image || !price) {
            return res.status(404).send("Bad Request - all fields must be provided!");
        } else {
            await act.putBook(bookId, req.body);
            return res.status(201).json({
                message: "Book has been updated successfully"
            });
        }
    }
});

// [done ... tested]
router.patch("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await act.getBookById(bookId);
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        const fieldName = req.query.fieldName;
        const fieldValue = req.query.fieldValue;
        if (!fieldName) {
            return res.status(404).send("Field - fieldName is't provided!");
        }
        else if (!act.COLUMNS.includes(fieldName.trim().toLowerCase())) {
            return res.status(404).send("Provided - fieldName is't allowed!");
        }
        else if (!fieldValue) {
            return res.status(404).send("Field - fieldValue is't provided!");
        }
        else if (fieldValue.trim().length === 0) {
            return res.status(404).send("Provided - fieldValue mustn't be empty!");
        } else {
            await act.patchBook(bookId, fieldName, fieldValue);
        }
        
        return res.status(201).json({
            message: "Book has been modified successfully!"
        });
    }
});

// [done]
router.delete("/books/:id", async (req, res) => {
    const bookId = req.params.id;
    const book = await act.getBookById(bookId)
    if (!book) {
        return res.status(404).send("Not Found!");
    } else {
        await act.deleteBook(bookId);
        return res.status(200).json({
            message: "Book has been deleted successfully"
        });
    }
});

// exports
module.exports = router;
