const books = require("../models/books.model");
const users = require("../models/users.model");

// 3. Get Books :- get All the books in the system

exports.getAllBooks = (req, res) => {
  books.find().then((allBooks) => {
    if (!allBooks) {
      return res.status(404).send({ message: "No books found in the sytm!" });
    }
    res.send(allBooks);
  });
};

//5. Create book : -creates and saves new book in collection
exports.createBook = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: "Body not found !!" });
  }

  books
    .create(req.body)
    .then((book) => {
      res.status(201).json({ message: "Book Created successfully", book });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: "Error Creating Book", details: err.message });
    });
};

//8. Update the Book details (Only Admins)
exports.updateBookByAdmin = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: "Body not found !!" });
  }
  const { bookid } = req.params;
  const updateData = req.body;

  books
    .findByIdAndUpdate(bookid, updateData, { new: true })
    .then((updatedBook) => {
      if (!updatedBook) {
        return res.status(404).json({ error: "Book not found" });
      }
      res
        .status(200)
        .json({ message: "Book updated successfully", updatedBook });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to update book", details: err })
    );
};
