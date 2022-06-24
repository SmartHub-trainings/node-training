const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { compare } = require("bcrypt");
const constants = require("../../config/constants");

module.exports = async (req, res) => {
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
      expiresIn: "60m",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    console.log(error);
  }
};
