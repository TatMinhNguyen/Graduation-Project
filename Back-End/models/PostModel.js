const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true            
        },
        images:{
            type: Array,
            default: []
        },
        video:{
            type: String
        },
        comment:{
            type: Number,
            default: 0
        },
        feed:{
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("PostModel", postSchema);