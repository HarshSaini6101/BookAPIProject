const Router = require("express").Router();

const PublicationModel = require("../../database/publication");


Router.get("/", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json({ publications: getAllPublications });
});

Router.get("/:isbn", (req, res) => {
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

Router.post("/new", async (req, res) => {
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);
    return res.json({ message: "publications was added"});
});


module.exports = Router;