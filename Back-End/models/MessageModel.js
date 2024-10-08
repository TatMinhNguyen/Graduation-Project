const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: String,
        },
        senderId: {
            type: String,
        },
        text: {
            type: String,
            default: ''
        },
        image: {
            type: Object
        },
        video: {
            type: Object
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("MessageModel", messageSchema);