const PostModel = require("../models/PostModel")
const UserModel = require("../models/UserModel");
const imagekit = require("../utils/imagekitConfig");

const postController = {
    //Create a post
    createPost : async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await UserModel.findById(userId);
    
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            // Upload ảnh lên ImageKit
            const imageUploadPromises = req.files.images ? req.files.images.map(image => {
                return imagekit.upload({
                    file: image.buffer, // buffer ảnh từ multer
                    fileName: image.originalname,
                    folder: '/images' // Thư mục lưu ảnh
                });
            }) : [];
    
            const videoUploadPromise = req.files.video ? imagekit.upload({
                file: req.files.video[0].buffer, // buffer video từ multer
                fileName: req.files.video[0].originalname,
                folder: '/videos' // Thư mục lưu video
            }) : Promise.resolve(null);
    
            const [imageUploadResults, videoUploadResult] = await Promise.all([
                Promise.all(imageUploadPromises),
                videoUploadPromise
            ]);
    
            const imageUrls = imageUploadResults.map(uploadResult => uploadResult.url);
            const videoUrl = videoUploadResult ? videoUploadResult.url : null;
    
            const newPost = new PostModel({
                userId: user._id,
                description: req.body.description,
                images: imageUrls,
                video: videoUrl
            });
    
            await newPost.save();

            const result = {
                author: {
                    authorId: user.id,
                    authorName: user.username,
                    authorAvatar: user.profilePicture
                },
                newPost
            }
    
            return res.status(201).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
}
module.exports = postController
