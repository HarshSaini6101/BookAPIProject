const Router = require("express").Router();

const BookModel = require("../../database/Book");


Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({ Books: getAllBooks });
});

Router.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    if (!getSpecificBook) {
        return res.json({
            error: `no book found for the ISBN of ${req.params.isbn}`,
        });
    }
        return res.json({book: getSpecificBook});
});

Router.get("/c/:category", async (req, res) => {
    const getSpecificBooks = await BookModel.findOne({category: req.params.category, });

    if(!getSpecificBooks) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
        });
    }
        return res.json({book: getSpecificBooks});
});

Router.post("/new", async (req, res) => {
    const { newBook } = req.body;
   
    BookModel.create(newBook);

    return res.json({  message: "book was added"});
});

Router.put("/update/:isbn", async (req, res) => {

    const updatedBook = await BookModel.findOneAndUpdate({
    ISBN:    req.params.isbn,
    },
    {
        title: req.body.bookTitle,
    },
    {
        new: true,
    });

    return res.json({ books: updatedBook });
});

Router.put("/book/author/update/:isbn", async (req, res) => {

    const updatedBook = await BookModel.findOneAndUpdate({
    ISBN:    req.params.isbn,
    },
    {
        title: req.body.bookTitle,
    },
    {
        $addToSet: {
            author: req.body.newAuthor,
        },
    },
    {
        new: true,
    });

    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id: req.params.isbn,
    },
    {
        $addToSet: {
            books: req.params.isbn,
        },
    },
    {
        new: true,
    });

    return res.json({ books: updatedBook,
        authors:updatedAuthor,
        message: "new author was added", });
});

module.exports = Router;