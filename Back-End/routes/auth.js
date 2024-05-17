const router = require("express").Router();

const authController = require("../controllers/authController");
const middleware = require("../Middleware/index");

//REGISTER
router.post("/register", authController.registerUser);

//VERIFY ACCOUNT
router.post("/set-verify", authController.verifyAccount)

//RESEND VERYFY CODE
router.post("/get-verify", authController.resendVerificationCode)

//REFRESH TOKEN
// router.post("/refresh", authController.requestRefreshToken);

//LOG IN
router.post("/login", authController.loginUser);

// CHANGE PASSWORD
router.post("/change-password", middleware.verifyToken, authController.changePassword)

// LOG OUT
router.post("/logout", middleware.verifyToken, authController.logOut);

module.exports = router;