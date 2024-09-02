const CommentModel = require("../models/CommentModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const imagekit = require("../utils/imagekitConfig");

const commentController = {
    //Create Comment
    createComment: async(req, res) => {
        try {
            const userId = req.user.id;
            const {postId, content} = req.body;

            const user = await UserModel.findById(userId);

            if(!user){
                return res.status(404).json({ error: "User not found" });
            }

            const post = await PostModel.findById(postId);

            if(!post){
                return res.status(404).json({ error: "Post not found" });
            }

            // Upload ảnh lên ImageKit
            const imageUploadPromises = req.files.image ? imagekit.upload({
                file: req.files.image[0].buffer, // buffer video từ multer
                fileName: req.files.image[0].originalname,
                folder: '/images' // Thư mục lưu video
            }) : Promise.resolve(null);

            const [imageUploadResults] = await Promise.all([
                imageUploadPromises,
            ]);
    
            const imageUrl = imageUploadResults ? { 
                url: imageUploadResults.url, 
                fileId: imageUploadResults.fileId 
            } : null; 
            
            const newComment = new CommentModel({
                postId: postId,
                userId: userId,
                content: content,
                image: imageUrl
            })

            post.comment = post.comment + 1;

            await newComment.save();
            await post.save();

            const result = {
                author: {
                    authorId: user.id,
                    authorName: user.username,
                    authorAvatar: user.profilePicture
                },
                newComment
            }

            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    //Update comment
    updateComment: async(req, res) => {
        try {
            const userId = req.user.id;
            const commentId = req.params.commentId;
            const {content, imageId} = req.body;

            const comment = await CommentModel.findById(commentId);

            if(!comment) {
                return res.status(404).json({ error: "Comment not found" })
            }

            if(userId != comment.userId ) {
                return res.status(403).json({ error: "You are not the author of this comment or this post" })
            }

            // Upload ảnh lên ImageKit
            const imageUploadPromises = req.files.image ? imagekit.upload({
                file: req.files.image[0].buffer, // buffer video từ multer
                fileName: req.files.image[0].originalname,
                folder: '/images' // Thư mục lưu video
            }) : Promise.resolve(null);

            const [imageUploadResults] = await Promise.all([
                imageUploadPromises,
            ]);
    
            const imageUrl = imageUploadResults ? { 
                url: imageUploadResults.url, 
                fileId: imageUploadResults.fileId 
            } : null; 

            if(content) {
                comment.content = content
            }

            if(imageUrl || imageId) { 
                let removeImage = null;

                if(imageUrl && comment?.image){
                    removeImage = comment.image.fileId;
                }

                if(imageId){
                    removeImage = imageId;
                }

                if(removeImage){
                    // Xóa image trên ImageKit
                    const imageDeletionPromise = comment.image ? imagekit.deleteFile(removeImage)
                    : Promise.resolve(null);

                    // Chờ xóa tất cả các ảnh 
                    await Promise.all([
                        imageDeletionPromise
                    ]);                    
                }

                //update DB
                if(imageUrl){
                    comment.image = imageUrl
                }else{
                    comment.image = null;
                }
            }

            await comment.save();

            return res.status(200).json({ message: "Update Success"});
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    //Delete Comment
    deleteComment: async(req, res) => {
        try {
            const userId = req.user.id;
            const commentId = req.params.commentId;

            const comment = await CommentModel.findById(commentId);

            if(!comment) {
                return res.status(404).json({ error: "Comment not found" })
            }

            const post = await PostModel.findById(comment.postId);

            if(!post) {
                return res.status(404).json({ error: "Post not found" })
            }

            if(userId != comment.userId && userId != post.userId) {
                return res.status(403).json({ error: "You are not the author of this comment or this post" })
            } 
            
            // Xóa image trên ImageKit
            const imageDeletionPromise = comment.image ? imagekit.deleteFile(comment.image.fileId)
                : Promise.resolve(null);

            // Chờ xóa tất cả các ảnh 
            await Promise.all([
                imageDeletionPromise
            ]);

            post.comment = post.comment - 1;

            await post.save()
            await CommentModel.findByIdAndDelete(commentId)

            return res.status(200).json({ message: "Comment deleted successfully" })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },

    // Get comment from a post
    getComment: async(req, res) => {
        try {
            const postId = req.params.postId;

            const commenttPromises = res.paginatedResults.results;

            const comments = commenttPromises.filter(comment => comment.postId == postId)
            // await CommentModel.find({ postId: postId })

            if(!comments) {
                return res.status(404).json({ error: "Comment not found" })
            }

            // Tạo một mảng các lời hứa (promises) để lấy thông tin người dùng tương ứng với mỗi bài viết
            const userPromises = comments.map(comment => UserModel.findById(comment.userId));
            
            // Chờ tất cả các lời hứa hoàn thành
            const users = await Promise.all(userPromises);
            
            const results = comments.map((comment, index) => {
                const user = users[index];
                return {
                    commentId: comment._id,
                    postId: comment.postId,
                    image: comment.image,
                    content: comment.content,
                    felt: comment.felt,
                    createdAt: comment.createdAt,
                    author: {
                        authorId: user._id,
                        authorName: user.username,
                        authorAvatar: user.profilePicture
                    }
                };
            });
            
            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = commentController