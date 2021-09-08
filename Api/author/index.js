const Router = require("express").Router();

const AuthorModel = require("../../database/author");


Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
});

Router.get("/:isbn", (req, res) => { AuthorModel.findOne({ ISBN: req.params.isbn });

    if (!getSpecificAuthors) {
        return res.json({
            error: `no author found for the book ${req.params.isbn}`,
        });
    }
    return res.json({author: getSpecificAuthors});
});

Router.post("/new", async (req, res) => {
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);
    return res.json({  message: "author was added"});
});

module.exports = Router;