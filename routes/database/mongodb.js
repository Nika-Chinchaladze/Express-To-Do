// imports
const mongoose = require("mongoose");

// connection setup
const url = "mongodb://127.0.0.1:27017/book";
const db = async () => {
    try {
        const con = await mongoose.connect(url);
        console.log(`mongodb connected: ${con.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}

// exports
module.exports = db;
