const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI, PORT } = require("./config/constants");
const jwt = require("jsonwebtoken");

const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));
app.use(cors());

app.use((req, res, next) => {
  console.log("You got to me first");
  next();
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error(err);
  });

//articles:Resource
app.use("/articles", require("./routes/articlesRoutes"));
app.use("/users", require("./routes/usersRoutes"));

//users: Resource

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("App is running on Port " + PORT);
  }
});
