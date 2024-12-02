const mongoose = require("mongoose");

const returnSchema = mongoose.Schema(
  {
    username: String,
    bookid: { type: mongoose.ObjectId, ref: "books", unique: true },
    duedate: { type: Date, ref: "borrows" },
    fine: Number,
  },
  { timestamps: true }
);

const Return = mongoose.model("Return", returnSchema);

module.exports = Return;
