const { hash } = require("bcrypt");
const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const body = req.body;
    // if (!body.firstName) {
    //   return res.status(400).json({
    //     error: { message: "First Name Is required" },
    //   });
    // }
    // if (!body.lastName) {
    //   return res.status(400).json({
    //     error: { message: "Last Name Is required" },
    //   });
    // }
    if (!body.firstName || !body.lastName || !body.email) {
      return res.status(400).json({
        error: { message: "All fields are required" },
      });
    }
    if (body.password !== body.confirmPassword) {
      return res.status(400).json({
        error: { message: "Password and confirm password must match" },
      });
    }

    const aUser = await User.findOne({ email: body.email });
    if (aUser) {
      return res.status(400).json({
        error: { message: "Email Alraady Exist" },
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
