const Article = require("../../models/Article");
const Joi = require("joi");
const path = require("path");

const Schema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  content: Joi.string().optional(),
});

module.exports = async (req, res) => {
  // console.log(req);
  try {
    const { error, value } = Schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ error: { message: error.details[0].message } });
    }
    // const user = await User.findOne({ _id: req.user._id });
    const body = req.body;
    const file = req.file;
    // console.log(file);
    // console.log(path.parse(path.parse(__dirname).dir));
    body.imageURL = path.parse(path.parse(__dirname).dir).dir + "/" + file.path;
    // body.imageURL = file.path;
    // return;

    // body.author = user.lastName + " " + user.firstName;
    body.author = req.user._id;

    const preArticle = new Article(body);
    const article = await preArticle.save();
    return res.json(article);
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
};
