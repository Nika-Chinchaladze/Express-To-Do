// imports
const express = require("express");
const bodyParser = require("body-parser");

const router = require("./routes/crud");
const db = require("./routes/database/mongodb");

// app setup
const app = express();
const port = 3000;

// database setup & mongodb
db();

// app configurations
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(router);

// app listen port
app.listen(port, () => {
    console.log(`server runs on: https://localhost/${port}`);
});

// exports
module.exports = app;
