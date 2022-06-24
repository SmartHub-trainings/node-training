const addNewArticle = require("../controllers/articlesControls/addNewArticle");
const getAllArticles = require("../controllers/articlesControls/getAllArticles");
const upload = require("../middlewares/upload");
const userIsAuthenticated = require("../middlewares/userIsAuthenticated");

const router = require("express").Router();

router.get("/", getAllArticles);
router.post("/", userIsAuthenticated, upload.single("photo"), addNewArticle);
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
