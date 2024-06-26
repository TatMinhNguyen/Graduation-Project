const UserModel = require("../models/UserModel");

const friendController = {

    // Gợi ý kết bạn
    getSuggestFriends: async (req, res) => {
        try {
            const userId = req.user.id;
    
            // Lấy thông tin của người dùng hiện tại
            const currentUser = await UserModel.findById(userId, 'friends friendRequested friendRequesting blocked blocking');
            if (!currentUser) {
                return res.status(404).json({ message: 'Người dùng không tồn tại.' });
            }
    
            // Lấy danh sách bạn bè, lời mời kết bạn đã gửi, lời mời kết bạn nhận được và danh sách chặn của người dùng
            const friends = currentUser.friends;
            const friendRequested = currentUser.friendRequested;
            const friendRequesting = currentUser.friendRequesting;
            const blocked = currentUser.blocked;
            const blocking = currentUser.blocking;
    
            // Tập hợp các điều kiện để lọc
            const excludeUsers = [userId, ...friends, ...friendRequested, ...friendRequesting, ...blocked, ...blocking];
    
            // Tìm người dùng phù hợp với điều kiện
            const suggestedUsers = await UserModel.find(
                { 
                    _id: { $nin: excludeUsers }, // Loại bỏ các người dùng đã xác định
                    isVerify: true // Chỉ lấy những người dùng đã xác thực
                },
                { 
                    _id: 1, 
                    username: 1, 
                    profilePicture: 1, 
                    friends: 1, // Lấy danh sách bạn bè để tính toán bạn chung
                    friendsCount: 1, 
                    isVerify: 1
                }
            );
    
            // Tính toán bạn chung cho mỗi người dùng được gợi ý
            const suggestedUsersWithMutualFriends = suggestedUsers.map(user => {
                const mutualFriends = user.friends.filter(friendId => friends.includes(friendId));
                return {
                    _id: user._id,
                    username: user.username,
                    profilePicture: user.profilePicture,
                    friendsCount: user.friendsCount,
                    isVerify: user.isVerify,
                    mutualFriends: mutualFriends.length, // Số lượng bạn chung
                    // mutualFriendsList: mutualFriends // Danh sách bạn chung
                };
            });
    
            // Sắp xếp các người dùng theo số lượng bạn chung giảm dần
            suggestedUsersWithMutualFriends.sort((a, b) => b.mutualFriends - a.mutualFriends);
    
            // Giới hạn kết quả trả về tối đa 20 người dùng
            const topSuggestedUsers = suggestedUsersWithMutualFriends.slice(0, 20);
    
            return res.status(200).json(topSuggestedUsers);
        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },
    


    //Gửi lời mời kết bạn
    requestFriend: async (req, res) => {
        try {
            const currentUserId = req.user.id; // Lấy ID của người dùng hiện tại từ res.user.id
            const { userId } = req.params; // Lấy ID của người dùng mục tiêu từ params
    
            // Tìm người dùng hiện tại
            const currentUser = await UserModel.findById(currentUserId);
            if (!currentUser) {
                return res.status(404).json({ message: 'Người dùng hiện tại không tồn tại.' });
            }
    
            // Tìm người dùng mục tiêu
            const targetUser = await UserModel.findById(userId);
            if (!targetUser) {
                return res.status(404).json({ message: 'Người dùng mục tiêu không tồn tại.' });
            }
    
            // Kiểm tra xem đã gửi lời mời kết bạn trước đó chưa
            if (currentUser.friendRequesting.includes(userId)) {
                return res.status(400).json({ message: 'Bạn đã gửi lời mời kết bạn trước đó.' });
            }
    
            // Kiểm tra xem người dùng mục tiêu có chặn người dùng hiện tại không
            if (targetUser.blocking.includes(currentUserId)) {
                return res.status(403).json({ message: 'Bạn đã bị người dùng này chặn.' });
            }
    
            // Thêm ID của người dùng mục tiêu vào danh sách friendRequesting của người dùng hiện tại
            currentUser.friendRequesting.push(userId);
    
            // Thêm ID của người dùng hiện tại vào danh sách friendRequested của người dùng mục tiêu
            targetUser.friendRequested.push(currentUserId);
    
            // Lưu thay đổi vào cơ sở dữ liệu
            await currentUser.save();
            await targetUser.save();
    
            return res.status(200).json({ message: 'Lời mời kết bạn đã được gửi.' });
        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    //Hủy lời mời kết bạn
    cancelRequestFriend: async(req, res) =>{
        try {
            const currentUserId = req.user.id; // Lấy ID của người dùng hiện tại từ res.user.id
            const { userId } = req.params; // Lấy ID của người dùng mục tiêu từ params     
            
            // Tìm người dùng hiện tại
            const currentUser = await UserModel.findById(currentUserId);
            if (!currentUser) {
                return res.status(404).json({ message: 'Người dùng hiện tại không tồn tại.' });
            }
    
            // Tìm người dùng gửi lời mời
            const requesterUser = await UserModel.findById(userId);
            if (!requesterUser) {
                return res.status(404).json({ message: 'Người dùng gửi lời mời không tồn tại.' });
            }
            // Kiểm tra xem có send lời mời kết bạn từ requesterUser không
            if (!currentUser.friendRequesting.includes(userId)) {
                return res.status(400).json({ message: 'Không send kết bạn người dùng này.' });
            }

            // Xóa ID khỏi danh sách friendRequested và friendRequesting
            currentUser.friendRequesting = currentUser.friendRequesting.filter(id => id.toString() !== userId);
            requesterUser.friendRequested = requesterUser.friendRequested.filter(id => id.toString() !== currentUserId);
            
            // Lưu các thay đổi vào cơ sở dữ liệu
            await currentUser.save();
            await requesterUser.save();

            return res.status(200).json({ message: 'Lời mời kết bạn đã được hủy.' });
        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    //Chấp nhận kết bạn
    acceptFriend: async(req, res) => {
        try {
            const currentUserId = req.user.id; // Lấy ID của người dùng hiện tại từ res.user.id
            const { userId } = req.params; // Lấy ID của người dùng mục tiêu từ params     
            
            // Tìm người dùng hiện tại
            const currentUser = await UserModel.findById(currentUserId);
            if (!currentUser) {
                return res.status(404).json({ message: 'Người dùng hiện tại không tồn tại.' });
            }
    
            // Tìm người dùng gửi lời mời
            const requesterUser = await UserModel.findById(userId);
            if (!requesterUser) {
                return res.status(404).json({ message: 'Người dùng gửi lời mời không tồn tại.' });
            }
            // Kiểm tra xem có lời mời kết bạn từ requesterUser không
            if (!currentUser.friendRequested.includes(userId)) {
                return res.status(400).json({ message: 'Không có lời mời kết bạn từ người dùng này.' });
            }

            // Xóa ID khỏi danh sách friendRequested và friendRequesting
            currentUser.friendRequested = currentUser.friendRequested.filter(id => id.toString() !== userId);
            requesterUser.friendRequesting = requesterUser.friendRequesting.filter(id => id.toString() !== currentUserId);

            // Thêm mỗi người dùng vào danh sách bạn bè của người kia
            currentUser.friends.push(userId);
            requesterUser.friends.push(currentUserId);

            // Tăng số lượng bạn bè của cả hai người dùng
            currentUser.friendsCount += 1;
            requesterUser.friendsCount += 1;

            // Lưu các thay đổi vào cơ sở dữ liệu
            await currentUser.save();
            await requesterUser.save();

            return res.status(200).json({ message: 'Lời mời kết bạn đã được chấp nhận.' });
        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    //Từ chối kết bạn
    refuseFriend: async(req, res) => {
        try {
            const currentUserId = req.user.id; // Lấy ID của người dùng hiện tại từ res.user.id
            const { userId } = req.params; // Lấy ID của người dùng mục tiêu từ params     
            
            // Tìm người dùng hiện tại
            const currentUser = await UserModel.findById(currentUserId);
            if (!currentUser) {
                return res.status(404).json({ message: 'Người dùng hiện tại không tồn tại.' });
            }
    
            // Tìm người dùng gửi lời mời
            const requesterUser = await UserModel.findById(userId);
            if (!requesterUser) {
                return res.status(404).json({ message: 'Người dùng gửi lời mời không tồn tại.' });
            }
            // Kiểm tra xem có lời mời kết bạn từ requesterUser không
            if (!currentUser.friendRequested.includes(userId)) {
                return res.status(400).json({ message: 'Không có lời mời kết bạn từ người dùng này.' });
            }

            // Xóa ID khỏi danh sách friendRequested và friendRequesting
            currentUser.friendRequested = currentUser.friendRequested.filter(id => id.toString() !== userId);
            requesterUser.friendRequesting = requesterUser.friendRequesting.filter(id => id.toString() !== currentUserId);  
            
            // Lưu các thay đổi vào cơ sở dữ liệu
            await currentUser.save();
            await requesterUser.save();

            return res.status(200).json({ message: 'Lời mời kết bạn đã được từ chối.' });
        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    //Hủy kết bạn
    cancelFriend: async(req, res) => {
        try {
            const currentUserId = req.user.id; // Lấy ID của người dùng hiện tại từ res.user.id
            const { userId } = req.params; // Lấy ID của người dùng mục tiêu từ params     
            
            // Tìm người dùng hiện tại
            const currentUser = await UserModel.findById(currentUserId);
            if (!currentUser) {
                return res.status(404).json({ message: 'Người dùng hiện tại không tồn tại.' });
            }
    
            // Tìm người dùng gửi lời mời
            const requesterUser = await UserModel.findById(userId);
            if (!requesterUser) {
                return res.status(404).json({ message: 'Người dùng gửi lời mời không tồn tại.' });
            }
            
            if (!currentUser.friends.includes(userId)) {
                return res.status(400).json({ message: 'Không kết bạn người dùng này.' });
            }

            if (!requesterUser.friends.includes(currentUserId)) {
                return res.status(400).json({ message: 'Không kết bạn người dùng này.' });
            }

            currentUser.friends = currentUser.friends.filter(id => id.toString() !== userId);
            requesterUser.friends = requesterUser.friends.filter(id => id.toString() !== currentUserId);

            currentUser.friendsCount -= 1;
            requesterUser.friendsCount-= 1;

            // Lưu các thay đổi vào cơ sở dữ liệu
            await currentUser.save();
            await requesterUser.save();

            return res.status(200).json({ message: 'Hủy bạn thành công' });            
        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    //get friend
    getFriends: async(req, res) => {
        try {
            const result = await UserModel.findById(req.params.userId).select('friends');

            if(!result){
                return res.status(404).json({ message: "userId invalid" })
            }

            const friendId = result.friends;
            const friends = await UserModel.find({ _id: {$in: friendId} }).select('id username profilePicture friendsCount')

            return res.status(200).json({ friends })
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    },

    //get loi moi ket ban
    getFriendsRequested: async(req, res) => {
        try {
            const userId = req.user.id;
            const result = await UserModel.findById(userId).select('friendRequested');

            const friendId = result.friendRequested;
            const friendsRequested = await UserModel.find({ _id: {$in: friendId} }).select('id username profilePicture friendsCount')

            return res.status(200).json({ friendsRequested })
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
    
}

module.exports = friendController;