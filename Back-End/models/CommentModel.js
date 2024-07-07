const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        content: {
            type: String,
            default: ""
        },
        image: {
            type: Object
        },
        felt: {
            type: Number,
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("CommentModel", commentSchema);
