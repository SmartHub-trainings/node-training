const User = require("../models/User");
const { hash, compare } = require("bcrypt");
const constants = require("../config/constants");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
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

const loginUser = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(400)
      .json({ error: { message: "Invalid email or password" } });
  }
  const isPassword = await compare(password, user.password);
  if (!isPassword) {
    return res
      .status(400)
      .json({ error: { message: "Invalid email or password" } });
  }
  const token = jwt.sign({ _id: user._id }, constants.JWT_SECRET_KEY, {
    expiresIn: "2d",
  });
  return res.status(200).json({ user, token });

  console.log(user);
};

module.exports = {
  createNewUser,
  loginUser,
  getAllUsers,
};
