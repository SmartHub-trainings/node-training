const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config/constants");
module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    //   console.log(authorization);
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET_KEY);
    req.user=payload
    next();
  } catch (err) {
    return res.status(401).json({ error: { message: "Not authorized" } });
  }
  //   console.log(req.headers);
};
