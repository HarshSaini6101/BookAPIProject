const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;