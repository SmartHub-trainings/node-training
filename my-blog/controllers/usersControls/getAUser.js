const User = require("../../models/User");
module.exports = async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await User.findOne({ _id });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
};
