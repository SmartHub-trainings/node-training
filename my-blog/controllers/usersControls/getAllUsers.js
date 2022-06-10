const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
};
