const router = require("express").Router();
const {
	registerController,
	loginController,
	getAllUserController,
} = require("../controllers/user-controller");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/", getAllUserController);

module.exports = router;
