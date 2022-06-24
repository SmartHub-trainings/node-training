const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
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
  // author: {
  //   type: String,
  //   default: "John Doe",
  // },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  imageURL: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
