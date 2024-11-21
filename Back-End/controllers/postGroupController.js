const UserModel = require("../models/UserModel");
const GroupModel = require("../models/GroupModel");
const PostGroupModel = require("../models/PostGroupModel");
const imagekit = require("../utils/imagekitConfig");
const FeelModel = require("../models/FeelModel");

const postGroupController = {
    //Create a post
    createPost : async (req, res) => {
        try {
            const userId = req.user.id;
            const groupId = req.params.groupId

            const user = await UserModel.findById(userId);
    
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const group = await GroupModel.findById(groupId);
    
            if (!group) {
                return res.status(404).json({ error: "User not found" });
            }

            // Kiểm tra nếu người dùng không phải là thành viên của nhóm
            if (!group.members.map(member => member.toString()).includes(userId)) {
                return res.status(400).json({ message: "Bạn không phải là thành viên của nhóm group này." });
            }
    
            // Upload ảnh lên ImageKit
            const imageUploadPromises = req.files.images ? req.files.images.map(image => {
                return imagekit.upload({
                    file: image.buffer, // buffer ảnh từ multer
                    fileName: image.originalname,
                    folder: '/images' // Thư mục lưu ảnh
                });
            }) : [];
    
            const [imageUploadResults] = await Promise.all([
                Promise.all(imageUploadPromises),
            ]);
    
            const imageUrls = imageUploadResults.map(uploadResult => ({
                url: uploadResult.url,
                fileId: uploadResult.fileId
            }));
    
            const newPost = new PostGroupModel({
                groupId: group._id,
                userId: user._id,
                description: req.body.description,
                images: imageUrls,
                typeText: req.body.typeText
            });
    
            await newPost.save();

            if(group.type === false) {
                if(group.createId.toString() !== userId){
                    group.pendingPosts.push(newPost._id)
                }    
            }

            await group.save();

            // const notification = new NotificationModel({
            //     sender: userId,
            //     receiver: user.friends,
            //     type: 'create_post',
            //     postId: newPost._id,
            //     message: `posted a new article.`
            // })

            // await notification.save();

            // const populatedNotification = await NotificationModel.findById(notification._id)
            // .populate('sender', 'username profilePicture')  // Populate thông tin người gửi
            // .populate('postId', 'description')               // Populate thông tin bài viết
            // .populate('commentId', 'content')                // Populate thông tin comment
            // .exec();

            // sendNotification(user.friends, populatedNotification)

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

    updatePost: async(req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.id;
            const {description, imageIds, videoId, typeText} = req.body;

            // Kiểm tra nếu imageIds không phải là mảng thì chuyển nó thành mảng, nếu không tồn tại thì gán mảng rỗng
            const imageIdsArray = Array.isArray(imageIds) ? imageIds : (imageIds ? [imageIds] : []);

            const post = await PostGroupModel.findById(postId)

            if(!post) {
                return res.status(404).json({ error: "Post not found" })
            }

            if(userId != post.userId){
                return res.status(403).json({ error: "You are not the author of this post" })
            }

            if(description){
                post.description = description;
            }

            if(typeText) {
                post.typeText = typeText;
            }

            // Upload ảnh lên ImageKit
            const imageUploadPromises = req.files.images ? req.files.images.map(image => {
                return imagekit.upload({
                    file: image.buffer, // buffer ảnh từ multer
                    fileName: image.originalname,
                    folder: '/images' // Thư mục lưu ảnh
                });
            }) : [];

            const [imageUploadResults] = await Promise.all([
                Promise.all(imageUploadPromises),
            ]);
    
            const imageUrls = imageUploadResults.map(uploadResult => ({
                url: uploadResult.url,
                fileId: uploadResult.fileId
            }));

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

    deletePost: async (req, res) => {
        try {
            const postId = req.params.postId;
            const groupId = req.params.groupId;
            const userId = req.user.id;

            // Tìm bài viết
            const post = await PostGroupModel.findById(postId);

            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }

            const group = await GroupModel.findById(groupId);
    
            if (!group) {
                return res.status(404).json({ error: "User not found" });
            }

            // Kiểm tra xem người dùng có phải là người tạo bài viết không
            if (post.userId.toString() !== userId || group.createId.toString() !== userId) {
                return res.status(403).json({ error: "You do not have permission to delete this post" });
            }

            // Xóa ảnh trên ImageKit
            const imageDeletionPromises = post.images.map(image => {
                const imageId = image.fileId
                return imagekit.deleteFile(imageId);
            });

            // Chờ xóa tất cả các ảnh và video
            await Promise.all([
                ...imageDeletionPromises,
            ]);

            // Xóa bài viết khỏi database
            await PostGroupModel.findByIdAndDelete(postId);

            return res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    //Get all post
    getPosts: async (req, res) => {
        try {
            const userId = req.user.id;

            const groupId = req.params.groupId;

            const group = await GroupModel.findById(groupId);
    
            if (!group) {
                return res.status(404).json({ error: "Group not found" });
            }

            // Tìm tất cả các bài viết
            let posts = res.paginatedResults.results;

            // Loại bỏ các bài viết có id trùng với group.pendingPosts
            const pendingPostIds = group.pendingPosts.map(postId => postId.toString());
            posts = posts.filter(post => !pendingPostIds.includes(post._id.toString()));

            // Tạo một mảng các lời hứa (promises) để lấy thông tin người dùng tương ứng với mỗi bài viết
            const userPromises = posts.map(post => UserModel.findById(post.userId));
            
            // Chờ tất cả các lời hứa hoàn thành
            const users = await Promise.all(userPromises);

            // Tạo một mảng các lời hứa để lấy thông tin cảm xúc của userId đối với từng post
            const feelPromises = posts.map(post => FeelModel.findOne({ userId: userId, postId: post._id }));

            // Chờ tất cả các lời hứa hoàn thành
            const feels = await Promise.all(feelPromises);

            const results = posts.map((post, index) => {
                const user = users[index];
                const feel = feels[index];
                return {
                    postId: post._id,
                    groupId: group._id,
                    description: post.description,
                    images: post.images,
                    video: post.video,
                    comment: post.comment,
                    felt: post.felt,
                    typeText: post.typeText,
                    createdAt: post.createdAt,
                    is_feel: feel ? feel.type : -1,
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

    getAPost: async(req, res) => {
        try {
            const postId = req.params.postId
            const post = await PostGroupModel.findById(postId)

            if(!post){
                return res.status(404).json({ error: "Post not found" })
            }

            const user = await UserModel.findById(post.userId)

            const feel = await FeelModel.findOne({ userId: req.user.id, postId: post._id })

            const result = {
                author: {
                    authorId: user.id,
                    authorName: user.username,
                    authorAvatar: user.profilePicture
                },
                post,
                is_feel: feel ? feel.type : -1,
            }
    
            return res.status(201).json(result);

        } catch (error) {
            return res.status(500).json({ error: error.message});
        }
    },

    getPendingPost: async(req, res) => {
        try {
            const groupId = req.params.groupId;

            // Tìm nhóm dựa trên groupId
            const group = await GroupModel.findById(groupId);
    
            if (!group) {
                return res.status(404).json({ error: "Group not found" });
            }
    
            // Lấy danh sách các bài viết trong pendingPosts
            const postIds = group.pendingPosts;
    
            // Tìm chi tiết các bài viết dựa trên danh sách pendingPosts
            const posts = await PostGroupModel.find({ _id: { $in: postIds } });
    
            // Tạo một mảng các lời hứa để lấy thông tin tác giả của mỗi bài viết
            const userPromises = posts.map(post => UserModel.findById(post.userId));
            const users = await Promise.all(userPromises);

            // Tạo một mảng các lời hứa để lấy thông tin cảm xúc của userId đối với từng post
            const feelPromises = posts.map(post => FeelModel.findOne({ userId: req.user.id, postId: post._id }));

            // Chờ tất cả các lời hứa hoàn thành
            const feels = await Promise.all(feelPromises);
    
            // Chuẩn bị kết quả để trả về
            const results = posts.map((post, index) => {
                const user = users[index];
                const feel = feels[index];
                return {
                    postId: post._id,
                    groupId: group._id,
                    description: post.description,
                    images: post.images,
                    video: post.video,
                    comment: post.comment,
                    felt: post.felt,
                    is_feel: feel ? feel.type : -1,
                    typeText: post.typeText,
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
    }
}

module.exports = postGroupController