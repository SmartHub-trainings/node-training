const Article = require("../models/Article");

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({});
    return res.status(200).json(articles);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
};

const getAnArticle = async (req, res) => {
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
};

const updateAnArticle = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const article = await Article.findOneAndUpdate(
      { _id: id },
      { ...body, updatedAt: Date.now },
      {
        new: true,
      }
    );
    return res.status(200).json(article);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
};

const createAnArticle = async (req, res) => {
  try {
    const body = req.body;
    const preArticle = new Article(body);
    const article = await preArticle.save();
    return res.json(article);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
};

module.exports = {
  getAllArticles,
  getAnArticle,
  updateAnArticle,
  createAnArticle,
};
