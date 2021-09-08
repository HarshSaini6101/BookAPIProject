const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        minlenght: 8,
        maxlenght: 10,
    },
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