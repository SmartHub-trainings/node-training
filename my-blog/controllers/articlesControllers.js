const Article = require("../models/Article");
const Joi = require("joi");

const Schema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  content: Joi.string().optional(),
});

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

module.exports = {
  getAnArticle,
  updateAnArticle,
  createAnArticle,
};
