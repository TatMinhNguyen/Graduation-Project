const FeelModel = require("../models/FeelModel");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

const searchController =  {
    searchPostsAndUsers: async (req, res) => {
        try {
            const userId = req.user.id;
            const searchInput = req.query.q || ""; // Lấy từ khóa tìm kiếm từ query params
            
            // Escape các ký tự đặc biệt để tránh lỗi regex
            const escapedSearchInput = searchInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            
            // Tạo regex để tìm kiếm description và username tương đồng
            const searchRegex = new RegExp(escapedSearchInput, 'i'); // 'i' để không phân biệt chữ hoa/thường
    
            // Tìm tất cả các bài viết có description khớp với từ khóa tìm kiếm
            const posts = await PostModel.find({ description: { $regex: searchRegex } });
    
            // Tìm tất cả người dùng có username khớp với từ khóa tìm kiếm
            const users = await UserModel.find(
                { username: { $regex: searchRegex }, isVerify: true, _id: { $nin: userId }, },
                { 
                    _id: 1, 
                    username: 1, 
                    profilePicture: 1, 
                    friends: 1, 
                    friendsCount: 1, 
                    isVerify: 1
                }
            );

            // Lấy danh sách bạn bè của người dùng đang đăng nhập
            const currentUser = await UserModel.findById(userId);
            const friends = currentUser.friends;
    
            // Tạo một mảng các lời hứa (promises) để lấy thông tin người dùng tương ứng với mỗi bài viết
            const userIds = posts.map(post => post.userId);
            const postUsers = await UserModel.find({ _id: { $in: userIds } });
    
            // Tạo một mảng các lời hứa để lấy thông tin cảm xúc của userId đối với từng post
            const feelPromises = posts.map(post => FeelModel.findOne({ userId: userId, postId: post._id }));
            const feels = await Promise.all(feelPromises);
    
            // Kết quả tìm kiếm bài viết
            const postResults = posts.map((post, index) => {
                const user = postUsers.find(u => u._id.equals(post.userId));
                const feel = feels[index];
                return {
                    postId: post._id,
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
    
            // Kết quả tìm kiếm người dùng
            const userResults = users.map(user => {
                const mutualFriends = user.friends.filter(friendId => friends.includes(friendId));
                return {
                    userId: user._id,
                    username: user.username,
                    profilePicture: user.profilePicture,
                    friendsCount: user.friendsCount,
                    // isVerify: user.isVerify,
                    mutualFriends: mutualFriends.length
                };
            });
    
            return res.status(200).json({ posts: postResults, users: userResults });
    
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = searchController;
