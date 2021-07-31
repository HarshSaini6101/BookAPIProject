const express = require("express");

const database = require("./database/index");

const ventures = express();

ventures.use(express.json());

ventures.get("/", (req, res) => {
    return res.json({ books: database.books });
});

ventures.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if (getSpecificBook.length === 0) {
        return res.json({
            error: `no book found for the ISBN of ${req.params.isbn}`,
        });
    }
        return res.json({book: getSpecificBook});
});

ventures.get("/c/:category", (req, res) => {
    const getSpecificBooks = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if(getSpecificBooks.length === 0) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }
        return res.json({book: getSpecificBooks});
});

ventures.get("/authors", (req, res) => {
    return res.json({ authors: database.authors });
});

ventures.get("/authors/:isbn", (req, res) => {
    const getSpecificAuthors = database.authors.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if (getSpecificAuthors.length === 0) {
        return res.json({
            error: `no author found for the book ${req.params.isbn}`,
        });
    }
    return res.json({author: getSpecificAuthors});
});

ventures.get("/publications", (req, res) => {
    return res.json({ publications: database.publications });
});

ventures.get("/publications", (req, res) => {
    return res.json({ publications: database.publications });
});

ventures.get("/publications/:isbn", (req, res) => {
    const getSpecificPublications = database.publications.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if (getSpecificPublications.length === 0) {
        return res.json({
            error: `no publications found for the book ${req.params.isbn}`,
        });
    }
    return res.json({publication: getSpecificPublications});
});

ventures.post("/book/new", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);
    return res.json({ books: database.books, message: "book was added"});
});

ventures.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    database.authors.push(newAuthor);
    return res.json({ authors: database.authors, message: "author was added"});
});

ventures.post("/publications/new", (req, res) => {
    const { newPublication } = req.body;
    database.publications.push(newPublication);
    return res.json({ publications: database.publications, message: "publications was added"});
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