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
    
            const imageUrls = imageUploadResults.map(uploadResult => ({
                url: uploadResult.url,
                fileId: uploadResult.fileId
            }));
            
            const videoUrl = videoUploadResult ? { 
                url: videoUploadResult.url, 
                fileId: videoUploadResult.fileId 
            } : null;
    
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

    //Update a post
    updatePost: async(req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.id;
            const description = req.body.description;
            const imageIds = req.body.imageIds;
            const videoId = req.body.videoId;

            // Kiểm tra nếu imageIds không phải là mảng thì chuyển nó thành mảng, nếu không tồn tại thì gán mảng rỗng
            const imageIdsArray = Array.isArray(imageIds) ? imageIds : (imageIds ? [imageIds] : []);

            const post = await PostModel.findById(postId)

            if(!post) {
                return res.status(404).json({ error: "Post not found" })
            }

            if(userId != post.userId){
                return res.status(403).json({ error: "You are not the author of this post" })
            }

            if(description){
                post.description = description;
            }

            const videoUploadPromise = req.files.video ? imagekit.upload({
                file: req.files.video[0].buffer, // buffer video từ multer
                fileName: req.files.video[0].originalname,
                folder: '/videos' // Thư mục lưu video
            }) : Promise.resolve(null);

            // Upload ảnh lên ImageKit
            const imageUploadPromises = req.files.images ? req.files.images.map(image => {
                return imagekit.upload({
                    file: image.buffer, // buffer ảnh từ multer
                    fileName: image.originalname,
                    folder: '/images' // Thư mục lưu ảnh
                });
            }) : [];

            const [imageUploadResults, videoUploadResult] = await Promise.all([
                Promise.all(imageUploadPromises),
                videoUploadPromise
            ]);
    
            const imageUrls = imageUploadResults.map(uploadResult => ({
                url: uploadResult.url,
                fileId: uploadResult.fileId
            }));
            
            const videoUrl = videoUploadResult ? { 
                url: videoUploadResult.url, 
                fileId: videoUploadResult.fileId 
            } : null;

            if(videoUrl || videoId){               
                let removeVideo = null;

                if(videoUrl){
                    removeVideo = post.video.fileId;
                }

                if(videoId){
                    removeVideo = videoId;
                }

                // Xóa video trên ImageKit
                const videoDeletionPromise = post.video ? imagekit.deleteFile(removeVideo)
                : Promise.resolve(null);

                // Chờ xóa tất cả các ảnh và video
                await Promise.all([
                    // ...imageDeletionPromises,
                    videoDeletionPromise
                ]);

                //update DB
                if(videoUrl){
                    post.video = videoUrl
                }else{
                    post.video = null;
                }
            }

            if (imageUrls.length > 0 || imageIdsArray.length > 0) {
                if (imageIdsArray.length > 0) {
                    // Xóa ảnh trên ImageKit
                    const imageDeletionPromises = imageIdsArray.map(imageId => {
                        return imagekit.deleteFile(imageId);
                    });
    
                    await Promise.all(imageDeletionPromises);
    
                    // Update DB
                    post.images = post.images.filter(image => !imageIdsArray.includes(image.fileId));
                }
    
                // Thêm URL mới vào DB
                post.images.push(...imageUrls);
            }

            await post.save();

            return res.status(200).json("Update Success")

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Delete a post
    deletePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.id;

            // Tìm bài viết
            const post = await PostModel.findById(postId);

            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            // Kiểm tra xem người dùng có phải là người tạo bài viết không
            if (post.userId.toString() !== userId) {
                return res.status(403).json({ error: "You do not have permission to delete this post" });
            }

            // Xóa ảnh trên ImageKit
            const imageDeletionPromises = post.images.map(image => {
                const imageId = image.fileId
                return imagekit.deleteFile(imageId);
            });

            // Xóa video trên ImageKit
            const videoDeletionPromise = post.video ? imagekit.deleteFile(post.video.fileId)
            : Promise.resolve(null);

            // Chờ xóa tất cả các ảnh và video
            await Promise.all([
                ...imageDeletionPromises,
                videoDeletionPromise
            ]);

            // Xóa bài viết khỏi database
            await PostModel.findByIdAndDelete(postId);

            return res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Get all post
    getPosts: async (req, res) => {
        try {
            // Tìm tất cả các bài viết
            const posts = res.paginatedResults.results;

            // Tạo một mảng các lời hứa (promises) để lấy thông tin người dùng tương ứng với mỗi bài viết
            const userPromises = posts.map(post => UserModel.findById(post.userId));
            
            // Chờ tất cả các lời hứa hoàn thành
            const users = await Promise.all(userPromises);

            const results = posts.map((post, index) => {
                const user = users[index];
                return {
                    postId: post._id,
                    description: post.description,
                    images: post.images,
                    video: post.video,
                    comment: post.comment,
                    felt: post.felt,
                    createdAt: post.createdAt,
                    author: {
                        authorId: user._id,
                        authorName: user.username,
                        authorAvatar: user.profilePicture
                    }
                };
            });

            return res.status(200).json(results);            
        } catch (error) {
            return res.status(500).json({ error: error.message});
        }
    },

    // GET A POST
    getAPost: async(req, res) => {
        try {
            const postId = req.params.postId
            const post = await PostModel.findById(postId)

            if(!post){
                return res.status(404).json({ error: "Post not found" })
            }

            const user = await UserModel.findById(post.userId)

            const result = {
                author: {
                    authorId: user.id,
                    authorName: user.username,
                    authorAvatar: user.profilePicture
                },
                post
            }
    
            return res.status(201).json(result);

        } catch (error) {
            return res.status(500).json({ error: error.message});
        }
    },

    //Get All Posts from a User
    getUserPost: async(req, res) => {
        try {
            const userId = req.params.userId;
            
            const postPromises = res.paginatedResults.results;

            const posts = postPromises.filter(post => post.userId == userId)
            // await PostModel.find({ userId: userId });

            if(!posts) {
                return res.status(404).json({ error: "Post not found" })
            }

            // Tạo một mảng các lời hứa (promises) để lấy thông tin người dùng tương ứng với mỗi bài viết
            const userPromises = posts.map(post => UserModel.findById(post.userId));
            
            // Chờ tất cả các lời hứa hoàn thành
            const users = await Promise.all(userPromises);
            
            const results = posts.map((post, index) => {
                const user = users[index];
                return {
                    postId: post._id,
                    description: post.description,
                    images: post.images,
                    video: post.video,
                    comment: post.comment,
                    felt: post.felt,
                    createdAt: post.createdAt,
                    author: {
                        authorId: user._id,
                        authorName: user.username,
                        authorAvatar: user.profilePicture
                    }
                };
            });

            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ error: error.message});
        }
    }

}
module.exports = postController
