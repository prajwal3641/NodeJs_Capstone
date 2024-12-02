const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  username: { type: String, unique: [true, "username must be unique"] },
  password: String,
  email: { type: String, unique: [true, "Email must be unique"] },
  mobile: { type: Number, unique: [true, "Mobile must be unique"] },
  admin: { type: Boolean, default: false },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
