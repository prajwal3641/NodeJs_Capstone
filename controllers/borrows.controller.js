const borrows = require("../models/borrows.model");
const users = require("../models/users.model");
const books = require("../models/books.model");

//6. Borrow Book
exports.borrowBook = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: "Body not found !!" });
  }

  const { username, bookid } = req.body;

  users
    .findOne({ username })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ message: "No user found with username: " + username });
      }

      books
        .findById(bookid)
        .then((book) => {
          if (!book) {
            return res.status(400).json({ error: "Book not found" });
          }

          if (!book.available) {
            return res.status(400).json({ error: "Book is not available" });
          }

          borrows
            .create(req.body)
            .then((borrowRecord) => {
              book.available = false; // Mark the book as unavailable
              book.save(); // Save book status update

              res
                .status(201)
                .json({ message: "Book borrowed successfully", borrowRecord });
            })
            .catch((err) =>
              res
                .status(400)
                .json({ error: "Error borrowing book", details: err })
            );
        })
        .catch((err) =>
          res.status(400).json({ error: "Error finding book", details: err })
        );
    })
    .catch((err) => {
      res.status(500).send({ message: "Error :--> " + err.message });
    });
};
