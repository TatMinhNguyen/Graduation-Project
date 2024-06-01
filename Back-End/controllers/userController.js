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
}

module.exports = userController