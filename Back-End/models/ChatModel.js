const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
            required: true
        },
        name:{
            type: String
        },
        createId:{
            type: String,
            // required: true
        },
        messageCount:{
            type:Number,
            default:0
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("ChatModels", chatSchema);