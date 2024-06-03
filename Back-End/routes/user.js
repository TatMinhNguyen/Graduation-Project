const router = require("express").Router();

const userController = require("../controllers/userController");
const middleware = require("../middleware/index");
const upload = require("../utils/upload");

//GET PROFILE
router.get("/get-profile/:id", middleware.verifyToken, userController.getProfileUser)

//UPDATE PROFILE
router.post("/update-profile", middleware.verifyToken, userController.updateProfile)

// Route upload avatar
router.post('/update-avatar', upload.single('image'), middleware.verifyToken, userController.uploadProfilePicture);

// Route upload background
router.post('/update-background', upload.single('image'), middleware.verifyToken, userController.uploadBackgroundPicture);

//Block
router.post('/block/:userId', middleware.verifyToken, userController.setBlock)

module.exports = router;