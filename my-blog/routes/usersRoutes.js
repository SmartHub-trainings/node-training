const getAllUsers = require("../controllers/usersControls/getAllUsers");
const getAUser = require("../controllers/usersControls/getAUser");
const loginUser = require("../controllers/usersControls/loginUser");
const registerUser = require("../controllers/usersControls/registerUser");
const userIsAuthenticated = require("../middlewares/userIsAuthenticated");

const router = require("express").Router();

router.post("/", registerUser);
router.get("/a-user", userIsAuthenticated, getAUser);

router.post("/login", loginUser);
router.get("/", getAllUsers);

module.exports = router;
