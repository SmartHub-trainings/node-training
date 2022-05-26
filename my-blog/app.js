const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));

const MONGO_URI =
  "mongodb+srv://my-blog:my-blog@cluster0.qovkx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error(err);
  });

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Health", "Fashion", "Tech"],
  },
  views: {
    type: Number,
    default: 0,
  },
  author: {
    type: String,
    default: "John Doe",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model("Article", ArticleSchema);

app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find({});
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
});
// app.get("/articles/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const article = await Article.findById(id);
//     return res.status(200).json(article);
//   } catch (error) {
//     console.error(error.message);
//     return res.send(error.message);
//   }
// });
app.get("/articles/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const article = await Article.findOneAndUpdate(
      { _id: id },
      { $inc: { views: 1 } },
      { new: true }
    );
    return res.status(200).json(article);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
});
app.put("/articles/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const article = await Article.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });
    return res.status(200).json(article);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
});

app.post("/articles", async (req, res) => {
  try {
    const body = req.body;
    const preArticle = new Article(body);
    const article = await preArticle.save();
    return res.json(article);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
});

const PORT = 6005;
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("App is running on Port " + PORT);
  }
});
