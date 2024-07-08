const CommentModel = require("../models/CommentModel");
const FeelModel = require("../models/FeelModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

const feelController = {
    //Set feel
    setFell: async (req, res) => {
        try {
            const userId = req.user.id;
            const { postId, commentId, type } = req.body;

            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            let target = null;

            if (postId) {
                target = await PostModel.findById(postId);

                if (!target) {
                    return res.status(404).json({ error: "Post not found" });
                }
            } else if (commentId) {
                target = await CommentModel.findById(commentId);

                if (!target) {
                    return res.status(404).json({ error: "Comment not found" });
                }
            } else {
                return res.status(400).json({ error: "postId or commentId must be provided" });
            }

            // Check if the user has already felt the post or comment
            let existingFeel;
            if (postId) {
                existingFeel = await FeelModel.findOne({ userId, postId });
            } else if (commentId) {
                existingFeel = await FeelModel.findOne({ userId, commentId });
            }

            if (existingFeel) {
                // User has already felt this post or comment, update the type
                existingFeel.type = type;
                await existingFeel.save();
            } else {
                // Increment the felt count
                target.felt = (target.felt || 0) + 1;
                await target.save();

                // Create a new feel record
                const newFellData = {
                    userId: userId,
                    type: type,
                };

                if (postId) {
                    newFellData.postId = postId;
                } else if (commentId) {
                    newFellData.commentId = commentId;
                }

                const newFell = new FeelModel(newFellData);
                await newFell.save();
            }

            const result = {
                author: {
                    authorId: user.id,
                    authorName: user.username,
                    authorAvatar: user.profilePicture
                },
                newFell
            };

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = feelController