const chatController = require("../controllers/chatController");
const messageController = require("../controllers/messageController");
const middleware = require("../middleware");
const upload = require("../middleware/multerConfig");

const router = require("express").Router();

router.post("/create-chat/:member", middleware.verifyToken, chatController.createChat);

router.post('/create-group-chat', middleware.verifyToken, chatController.createGroupChat);

router.get('/get-user-chat', middleware.verifyToken, chatController.userChats)

router.get('/get-a-chat/:chatId', middleware.verifyToken, chatController.getAChat)

router.post("/add-message",
    upload.fields([{ name: 'image', maxCount: 1}]), 
    middleware.verifyToken,
    messageController.addMessage
)

router.delete('/delete-message/:messageId', middleware.verifyToken, messageController.deleteMessage)

router.get('/get-message/:chatId', middleware.verifyToken, messageController.getMessages)

module.exports = router;