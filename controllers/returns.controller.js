const returns = require("../models/returns.model");
const borrows = require("../models/borrows.model");
const books = require("../models/books.model");

// 7. Return a Book
exports.returnBook = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: "Body not found !!" });
  }
  const { username, bookid, fine } = req.body;

  // Find borrow record
  borrows
    .findOne({ username, bookid })
    .then((borrowRecord) => {
      if (!borrowRecord) {
        return res
          .status(400)
          .json({ error: "No borrow record found for this user and book" });
      }

      // Create a return record
      returns
        .create({
          username,
          bookid,
          fine,
          duedate: borrowRecord.duedate,
        })
        .then((returnRecord) => {
          // Remove the borrow record

          borrows
            .findByIdAndDelete(borrowRecord._id)
            .then(() => {
              console.log("borrow deleted");
              // Update book availability
              books
                .findByIdAndUpdate(bookid, { available: true })
                .then(() => {
                  console.log("Books made true");
                  return res.status(200).json({
                    message: "Book returned successfully",
                    returnRecord,
                  });
                })
                .catch((err) =>
                  res.status(500).json({
                    error: "Failed to update book availability",
                    details: err,
                  })
                );
            })
            .catch((err) =>
              res.status(500).json({
                error: "Failed to remove borrow record",
                details: err.message,
              })
            );
        })
        .catch((err) =>
          res
            .status(500)
            .json({ error: "Failed to create return record", details: err })
        );
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: "Error finding borrow record", details: err })
    );
};

const calculateFine = (duedate) => {
  const due = new Date(duedate);
  const today = new Date();
  const timeDiff = today - due;
  const daysLate = timeDiff / (1000 * 3600 * 24);
  return daysLate > 0 ? daysLate * 10 : 0; // Example fine calculation (10 units per day late)
};
