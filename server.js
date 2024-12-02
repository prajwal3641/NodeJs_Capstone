const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://127.0.0.1:27017/Library", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => {
    console.log("Error connecting database, err ", err.message);

    process.exit();
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Server is running on poert 5000");
  res.send("server is running up and fine");
});

require("./routes/app.routes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running at port 5000"));

app.get("/testWithoutDatabase", (req, res) => {
  res.send({
    message: "Working fine without DB ",
    collections: "users,books,returns,borrows",
  });
});
