require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const database = require("./database/index");

const BookModel = require("./database/Book");
const authorModel = require("./database/author");
const publicationModel = require("./database/publication");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

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

ventures.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({ Books: getAllBooks });
});

ventures.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    if (!getSpecificBook) {
        return res.json({
            error: `no book found for the ISBN of ${req.params.isbn}`,
        });
    }
        return res.json({book: getSpecificBook});
});

ventures.get("/c/:category", async (req, res) => {
    const getSpecificBooks = await BookModel.findOne({category: req.params.category, });

    if(!getSpecificBooks) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }
        return res.json({book: getSpecificBooks});
});

ventures.get("/authors", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
});

ventures.get("/authors/:isbn", (req, res) => { AuthorModel.findOne({ ISBN: req.params.isbn });

    if (!getSpecificAuthors) {
        return res.json({
            error: `no author found for the book ${req.params.isbn}`,
        });
    }
    return res.json({author: getSpecificAuthors});
});

ventures.get("/publications", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json({ publications: getAllPublications });
});


ventures.get("/publications/:isbn", (req, res) => {
    const getSpecificPublications = database.publications.filter(
        (publication) => publication.Books.includes(req.params.isbn)
    );

    if (getSpecificPublications.length === 0) {
        return res.json({
            error: `no publications found for the book ${req.params.isbn}`,
        });
    }
    return res.json({publication: getSpecificPublications});
});

ventures.post("/book/new", async (req, res) => {
    const { newBook } = req.body;
   
    BookModel.create(newBook);

    return res.json({  message: "book was added"});
});

ventures.post("/author/new", async (req, res) => {
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);
    return res.json({  message: "author was added"});
});

ventures.post("/publications/new", async (req, res) => {
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);
    return res.json({ message: "publications was added"});
});

ventures.put("/book/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.bookTitle;
            return;
        }
    });
    return res.json({ books: database.books });
});

ventures.put("/book/author/update/:isbn", (req, res) => {
database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) 
    return book.authors.push(req.body.newAuthor);
});
 database.authors.forEach((author) => {
     if(author.id === req.body.newAuthor) 
     return author.books.push(req.params.isbn);
 });
 return res.json({books: database.books,
authors:database.authors,
message: "new author was added",});
});



ventures.listen(3000, () => console.log("server is running!!"));