const mongoose = require("mongoose");

const BookSchema = momngoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

const BookModel = mongoose.model("Books", BookSchema);

module.exports = BookModel;