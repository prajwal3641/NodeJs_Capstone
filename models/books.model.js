const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    name: String,
    author: String,
    genre: String,
    type: String,
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("books", bookSchema);

module.exports = Book;
