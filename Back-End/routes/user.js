const router = require("express").Router();

const userController = require("../controllers/userController");
const middleware = require("../middleware/index");

//GET PROFILE
router.get("/get-profile/:id", middleware.verifyToken, userController.getProfileUser)

//GET ALL USER
router.get("/get-all-user", middleware.verifyToken, userController.getAllUsers)

//UPDATE PROFILE
router.post("/update-profile", middleware.verifyToken, userController.updateProfile)

module.exports = router;