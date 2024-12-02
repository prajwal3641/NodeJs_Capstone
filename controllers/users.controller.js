const users = require("../models/users.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// 1. Register the user as admin or member

exports.registerUser = (req, res) => {
  if (!req.body) {
    return res.status(404).send({ message: "Body not found !!" });
  }

  users
    .create(req.body)
    .then((user) => {
      res.status(201).json({ message: "User registered successfully", user });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: "Error registering user", details: err.message });
    });
};

// 2. Authenticate user with username and password
exports.authenticate = (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  if (!req.body) {
    return res.status(404).send({ message: "Body not found !!" });
  }
  const { username, password } = req.body;
  users
    .findOne({ username, password })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      let data = {
        username: username,
        password: password,
        email: user.email,
        admin: user.admin,
      };
      const token = jwt.sign(data, jwtSecretKey);

      res.send({ message: "Login Successfull", token });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "error sending the jwt , err=>>" + err.message });
    });
};

// 4. Get users :- can view all the available users in system.

exports.getAllUser = (req, res) => {
  users.find().then((allUsers) => {
    if (!allUsers) {
      return res.status(404).send({ message: "Userss not found!" });
    }

    res.status(200).send(allUsers);
  });
};
