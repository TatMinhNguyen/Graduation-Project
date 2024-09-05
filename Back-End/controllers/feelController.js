const CommentModel = require("../models/CommentModel");
const FeelModel = require("../models/FeelModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

const feelController = {
    //Set feel
    setFell: async (req, res) => {
        try {
            const userId = req.user.id;
            const { postId, type } = req.body;

            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const post = await PostModel.findById(postId);

            if(!post){
                return res.status(404).json({ error: "Post not found" });
            }
            
            const newFelt = new FeelModel({
                userId: userId,
                postId: postId,
                type: type
            })

            post.felt = post.felt + 1;

            await newFelt.save();
            await post.save();

            return res.status(200).json({message: 'Success!'});
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    unFelt: async(req, res) => {
        try {
            const userId = req.user.id;
            const { postId } = req.params;
    
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
    
            // Tìm xem người dùng đã like bài viết này chưa
            const felt = await FeelModel.findOne({ userId: userId, postId: postId });
            if (!felt) {
                return res.status(400).json({ error: "You haven't liked this post yet" });
            }
    
            // Xóa lượt like và cập nhật số lượng likes của bài viết
            await FeelModel.deleteOne({ _id: felt._id });
            post.felt = post.felt - 1;
    
            await post.save();
    
            return res.status(200).json({ message: 'Post unliked successfully!' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    updateFelt: async(req, res) =>{
        try {
            const userId = req.user.id;
            const { postId } = req.params; // Lấy postId từ params
            const { type } = req.body; // Lấy type mới từ body
    
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            const post = await PostModel.findById(postId);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
    
            // Tìm xem lượt feel đã tồn tại chưa
            const felt = await FeelModel.findOne({ userId: userId, postId: postId });
            if (!felt) {
                return res.status(400).json({ error: "You haven't felt this post yet" });
            }
    
            // Cập nhật type cho feel
            felt.type = type;
    
            await felt.save(); // Lưu lại cảm xúc đã cập nhật
    
            return res.status(200).json({ message: 'Feel updated successfully!' });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    getFelt: async(req, res) => {
        try {
            const postId = req.params.postId;

            const feels = await FeelModel.find({ postId: postId})

            if(!feels) {
                return res.status(404).json({ error: "Feel not found" })
            }

            const userPromises = feels.map(feels => UserModel.findById(feels.userId));

            const users = await Promise.all(userPromises);

            const results = feels.map((feel, index) => {
                const user = users[index];
                return {
                    feelId: feel._id,
                    postId: feel.postId,
                    type: feel.type,
                    createdAt: feel.createdAt,
                    author: {
                        authorId: user._id,
                        authorName: user.username,
                        authorAvatar: user.profilePicture
                    }
                };
            });

            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
}

module.exports = feelController