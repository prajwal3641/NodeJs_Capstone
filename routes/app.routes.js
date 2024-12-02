const Book = require("../models/books.model");
const User = require("../models/users.model");
const checkAdmin = require("../middleware/checkAdmin");
const express = require("express");

module.exports = (app) => {
  const UserController = require("../controllers/users.controller");
  const BookController = require("../controllers/books.controller");
  const BorrowController = require("../controllers/borrows.controller");
  const ReturnController = require("../controllers/returns.controller");

  app.use(express.json());
  app.post("/registerUser", UserController.registerUser);
  app.get("/getAllUsers", UserController.getAllUser);

  // books
  app.get("/getAllBooks", BookController.getAllBooks);
  app.post("/createBook", BookController.createBook);
  app.put("/updateBook/:bookid", checkAdmin, BookController.updateBookByAdmin);

  // borrow
  app.post("/borrowBook", BorrowController.borrowBook);

  // return
  app.post("/returnBook", ReturnController.returnBook);

  // jwts
  app.get("/login", UserController.authenticate);
};
