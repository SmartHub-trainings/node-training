const getAllArticles = require("../controllers/articlesControls/getAllArticles");

const router = require("express").Router();

router.get("/", getAllArticles);
// router.get("/articles/:id", getAnArticle);
// router.put("/articles/:id", userIsAuthenticated, updateAnArticle);

// // router.post(
// //   "/articles",
// //   (req, res, next) => {
// //     console.log("You want to create an article");
// //     next();
// //   },
// //   createAnArticle
// // );
// router.post("/articles", userIsAuthenticated, createAnArticle);

module.exports = router;
