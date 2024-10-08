const chatController = require("../controllers/chatController");
const messageController = require("../controllers/messageController");
const middleware = require("../middleware");
const upload = require("../middleware/multerConfig");

const router = require("express").Router();

router.post("/create-chat/:member", middleware.verifyToken, chatController.createChat);

router.get('/get-user-chat', middleware.verifyToken, chatController.userChats)

router.post("/add-message",
    upload.fields([{ name: 'image', maxCount: 1}]), 
    middleware.verifyToken,
    messageController.addMessage
)

router.delete('/delete-message/:messageId', middleware.verifyToken, messageController.deleteMessage)

module.exports = router;