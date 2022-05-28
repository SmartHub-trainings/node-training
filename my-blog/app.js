const express = require("express");
const mongoose = require("mongoose");
const { MONGO_URI, PORT } = require("./config/constants");
const {
  getAllArticles,
  getAnArticle,
  updateAnArticle,
  createAnArticle,
} = require("./controllers/articlesControllers");
const { createNewUser } = require("./controllers/usersControllers");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));

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
app.put("/articles/:id", updateAnArticle);
app.post("/articles", createAnArticle);

//users
app.post("/users", createNewUser);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("App is running on Port " + PORT);
  }
});
