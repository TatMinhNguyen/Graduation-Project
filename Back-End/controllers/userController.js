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

    //GET ALL USER
    getAllUsers: async (req, res) => {
        try {
            const user = await UserModel.find({ isVerify: true }, 
                { _id: 1, username: 1, profilePicture: 1, friendsCount: 1, isVerify: 1});

            return res.status(200).json(user);
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
    }
}

module.exports = userController