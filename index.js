require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const books = require("./Api/book");
const authors = require("./Api/author");
const publications = require("./Api/publication");

const ventures = express();

ventures.use(express.json());

mongoose.connect(process.env.MONGO_URL,
    {
    useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .then(() => console.log("connection is ohk"));


ventures.use("/book", books)
ventures.use("/author", authors)
ventures.use("/publication", publications)

ventures.listen(3000, () => console.log("server is running!!"));