const PostModel = require("../models/PostModel");
const ReportPostModel = require("../models/ReportPostModel");
const UserModel = require("../models/UserModel");
const imagekit = require("../utils/imagekitConfig");

const adminController = {
    getPostReported: async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await UserModel.findById(userId);

            if (!user || !user.isAdmin) {
                return res.status(403).json({ message: "Bạn không phải admin." });
            }

            // Lấy danh sách bài viết bị báo cáo từ ReportPostModel, sắp xếp theo thời gian báo cáo (createdAt)
            const reportedPosts = await ReportPostModel.find().sort({ createdAt: -1 });

            if (!reportedPosts || reportedPosts.length === 0) {
                return res.status(404).json({ message: "Không có bài viết nào bị báo cáo." });
            }

            // Nhóm bài viết theo postId và chỉ giữ báo cáo sớm nhất
            const uniqueReports = {};
            reportedPosts.forEach((report) => {
                if (!uniqueReports[report.postId]) {
                    uniqueReports[report.postId] = report;
                }
            });
            const filteredReports = Object.values(uniqueReports);

            // Tạo mảng promises để lấy thông tin bài viết từ PostModel
            const postPromises = filteredReports.map((report) =>
                PostModel.findOne({ _id: report.postId, isReported: true })
            );
            const posts = await Promise.all(postPromises);

            // Loại bỏ các bài viết không tồn tại hoặc không có isReported === true
            const validPosts = posts.filter((post) => post);

            if (!validPosts || validPosts.length === 0) {
                return res.status(404).json({ message: "Không có bài viết hợp lệ." });
            }

            // Lấy thông tin tác giả từ UserModel
            const userPromises = validPosts.map((post) => UserModel.findById(post.userId));
            const authors = await Promise.all(userPromises);

            // Gộp thông tin bài viết, tác giả, và thông tin báo cáo
            const results = validPosts.map((post, index) => {
                const author = authors[index];
                const report = reportedPosts.find((report) => report.postId === post._id.toString());
                return {
                    postId: post._id,
                    description: post.description,
                    images: post.images,
                    video: post.video,
                    typeText: post.typeText,
                    createdAt: report?.createdAt, // Thời điểm bị báo cáo
                    author: {
                        authorId: author?._id,
                        authorName: author?.username,
                        authorAvatar: author?.profilePicture,
                    },
                };
            });

            return res.status(200).json(results);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    keepPost : async(req, res) => {
        try {
            const userId = req.user.id;
            const user = await UserModel.findById(userId);

            if (!user || !user.isAdmin) {
                return res.status(403).json({ message: "Bạn không phải admin." });
            }

            const postId = req.params.postId;

            const post = await PostModel.findById(postId)

            if(!post){
                return res.status(404).json({ error: "Post not found" })
            }

            post.isReported = false;

            await post.save();

            return res.status(200).json({message: "Keep"})
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    deletePost: async(req, res) => {
        try {
            const postId = req.params.postId;
            const userId = req.user.id;

            const user = await UserModel.findById(userId);
            if (!user.isAdmin) {
                return res.status(403).json({ error: "You do not have permission to delete this post" });
            }

            // Tìm bài viết
            const post = await PostModel.findById(postId);

            if (!post) {
                return res.status(404).json({ error: "Post not found" });
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
    }
}

module.exports = adminController