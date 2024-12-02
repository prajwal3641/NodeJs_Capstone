const mongoose = require("mongoose");

const borrowSchema = mongoose.Schema(
  {
    username: String,
    bookid: { type: mongoose.ObjectId, ref: "books", unique: true },
    duedate: {
      type: Date,
      default: () => new Date(+new Date() + 15 * 24 * 60 * 60 * 1000),
      required: "Must have DueDate",
    },
  },
  { timestamps: true }
);

const Borrow = mongoose.model("Borrow", borrowSchema);

module.exports = Borrow;
