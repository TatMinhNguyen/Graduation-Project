const UserModel = require("../models/UserModel");

const userController = {
    //get profile
    getProfileUser : async (req, res) => {
        const id = req.params.id;
    
        try {
            const user = await UserModel.findById(id);
            if (user) {
                const { password, 
                        verificationCode,
                        verificationCodeExpires,
                        friendRequested,
                        friendRequesting,

                    ...otherDetails 
                } = user._doc;

                if (!user.isVerify) {
                    return res.status(404).json("Account Invalid");
                }
        
                res.status(200).json(otherDetails);
            } else {
                return res.status(404).json("No such User");
            }
        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    // Cập nhật trang cá nhân
    updateProfile: async(req, res) =>{
        try {
            const user = await UserModel.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            
            user.address = req.body.address;
            user.work = req.body.work;

            await user.save();
            return res.status(200).json({message: 'Update profile successfully.'})

        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    // Upload profile picture
    uploadProfilePicture: async (req, res) => {
        try {
            const user = await UserModel.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Lưu URL ảnh vào profile của user
            user.profilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

            await user.save();
            return res.status(200).json({ message: 'Upload profile picture successfully.', profilePicture: user.profilePicture });

        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    // Upload background picture
    uploadBackgroundPicture: async (req, res) => {
        try {
            const user = await UserModel.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Lưu URL ảnh vào profile của user
            user.coverPicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

            await user.save();
            return res.status(200).json({ message: 'Upload cover picture successfully.', coverPicture: user.coverPicture });

        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    //Block
    setBlock: async(req, res) => {
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
    
            // Kiểm tra xem đã chặn trước đó chưa
            if (currentUser.blocking.includes(userId)) {
                return res.status(400).json({ message: 'Bạn đã chặn trước đó.' });
            }
    
            // Kiểm tra xem người dùng mục tiêu có chặn người dùng hiện tại không
            if (targetUser.blocking.includes(currentUserId)) {
                return res.status(403).json({ message: 'Bạn đã bị người dùng này chặn.' });
            }
    
            // Thêm ID của người dùng mục tiêu vào danh sách blocking của người dùng hiện tại
            currentUser.blocking.push(userId);
    
            // Thêm ID của người dùng hiện tại vào danh sách blocked của người dùng mục tiêu
            targetUser.blocked.push(currentUserId);
    
            // Lưu thay đổi vào cơ sở dữ liệu
            await currentUser.save();
            await targetUser.save();
    
            return res.status(200).json({ message: 'Đã block.' });            
        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    //unBlock
    setUnBlock: async(req, res) => {
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
    
            // Kiểm tra xem đã chặn trước đó chưa
            if (!currentUser.blocking.includes(userId)) {
                return res.status(400).json({ message: 'Bạn ko chặn trước đó.' });
            }
    
            // Kiểm tra xem người dùng mục tiêu có chặn người dùng hiện tại không
            if (targetUser.blocking.includes(currentUserId)) {
                return res.status(403).json({ message: 'Bạn đã bị người dùng này chặn.' });
            }
    
            currentUser.blocking = currentUser.blocking.filter(id => id.toString() !== userId);
            targetUser.blocked = targetUser.friendRequested.filter(id => id.toString() !== currentUserId); 
    
            // Lưu thay đổi vào cơ sở dữ liệu
            await currentUser.save();
            await targetUser.save();
    
            return res.status(200).json({ message: 'Đã Unblock.' });            
        } catch (error) {
            return res.status(500).json({ message: 'Có lỗi xảy ra.', error: error.message });
        }
    },

    //get users block
    getBlocks: async(req, res) => {
        try {
            const result = await UserModel.findById(req.user.id).select('blocking');

            if(!result){
                return res.status(404).json({ message: "userId invalid" })
            }

            const userId = result.blocking;
            const blocking = await UserModel.find({ _id: {$in: userId} }).select('id username profilePicture friendsCount')

            return res.status(200).json({ blocking })
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    },
}

module.exports = userController