const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI, PORT } = require("./config/constants");
const jwt = require("jsonwebtoken");
const userIsAuthenticated = require("./middlewares/userIsAuthenticated");
const cors = require("cors");

// console.log(
//   jwt.sign(
//     { name: "Victor", email: "victor@gmail.com", occupation: "Womanizing" },
//     "This is me",
//     { expiresIn: "2d" }
//   )
// );
const {
  getAllArticles,
  getAnArticle,
  updateAnArticle,
  createAnArticle,
} = require("./controllers/articlesControllers");
const {
  createNewUser,
  loginUser,
  getAllUsers,
  getAUser,
} = require("./controllers/usersControllers");
const { json } = require("express");

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

//articles
app.get("/articles", getAllArticles);
app.get("/articles/:id", getAnArticle);
app.put("/articles/:id", userIsAuthenticated, updateAnArticle);

// app.post(
//   "/articles",
//   (req, res, next) => {
//     console.log("You want to create an article");
//     next();
//   },
//   createAnArticle
// );
app.post("/articles", userIsAuthenticated, createAnArticle);

//users
app.post("/users", createNewUser);
app.get("/users/a-user", userIsAuthenticated, getAUser);

app.post("/users/login", loginUser);
app.get("/users", getAllUsers);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("App is running on Port " + PORT);
  }
});
