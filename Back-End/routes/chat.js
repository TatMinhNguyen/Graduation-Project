const chatController = require("../controllers/chatController");
const middleware = require("../middleware");

const router = require("express").Router();

router.post("/create-chat/:member", middleware.verifyToken, chatController.createChat);

router.get('/get-user-chat', middleware.verifyToken, chatController.userChats)

module.exports = router;