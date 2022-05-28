const User = require("../models/User");
const { hash } = require("bcrypt");

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

const createNewUser = async (req, res) => {
  try {
    const body = req.body;
    if (body.password !== body.confirmPassword) {
      return res.status(400).json({
        error: { message: "Password and confirm password must match" },
      });
    }
    const newPassword = await hash(body.password, 10);
    body.password = newPassword;

    const user = await User.create(body);

    return res.json(user);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
};

module.exports = {
  createNewUser,
};
