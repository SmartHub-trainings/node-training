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
  try {
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
      expiresIn: "2m",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createNewUser,
  loginUser,
  getAllUsers,
};
