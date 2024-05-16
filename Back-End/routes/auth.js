const authController = require("../controllers/authController");

const router = require("express").Router();
// const { verifyToken } = require("../controllers/middlewareController");

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

//LOG OUT
// router.post("/logout", verifyToken, authController.logOut);

module.exports = router;