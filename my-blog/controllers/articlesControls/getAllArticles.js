const Article = require("../../models/Article");
module.exports = async (req, res) => {
  console.log(req.query);
  const { limit, page } = req.query;
  const skip = (page - 1) * limit;

  try {
    // const articles = await Article.find({}).sort({ createdAt: -1 });
    const total = await Article.find({}).countDocuments();
    const pages = Math.ceil(total / limit);
    const articles = await Article.find({})
      .sort({ title: 1 })
      .limit(limit * 1)
      .skip(skip);
    return res.status(200).json({ page, total, pages, data: articles });
  } catch (error) {
    console.error(error.message);
    return res.send(error.message);
  }
};
