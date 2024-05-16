const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
    //Phương thức đăng kí
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            const verificationCode = Math.floor(100000 + Math.random() * 900000); 
            const expirationTime = new Date(Date.now() + 5 * 60 * 1000);
        
            const newUser = new UserModel({
                email: req.body.email,
                username: req.body.username,
                password: hashed,
                verificationCode: verificationCode, 
                verificationCodeExpires: expirationTime
            });

            await newUser.save();
            res.status(200).json({ verificationCode: verificationCode });
        } catch (err) {
          res.status(500).json(err);
        }
    },

    //Phương thức lấy mã xác thực
    verifyAccount: async (req, res) => {
        try {
          const { email, verificationCode } = req.body;
    
          // Tìm người dùng trong cơ sở dữ liệu bằng email
          const user = await UserModel.findOne({ email: email });
    
          // Kiểm tra nếu không tìm thấy người dùng hoặc mã xác thực không chính xác
          if (!user || user.verificationCode !== verificationCode) {
            return res.status(400).json({ message: 'Invalid verification code.' });
          }
    
          // Kiểm tra nếu mã xác thực đã hết hạn
          if (user.verificationCodeExpires < Date.now()) {
            return res.status(400).json({ message: 'Verification code has expired.' });
          }
    
          // Cập nhật trạng thái xác thực cho người dùng và xóa các trường verificationCode và verificationCodeExpires
          user.isVerify = true;
          user.verificationCode = undefined;
          user.verificationCodeExpires = undefined;
          await user.save();
    
          // Phản hồi thành công
          res.status(200).json({ message: 'Account verified successfully.' });
        } catch (err) {
          res.status(500).json(err);
        }
    },

    // Phương thức để gửi lại mã xác thực
    resendVerificationCode: async (req, res) => {
        try {
          const { email } = req.body;
    
          const user = await UserModel.findOne({ email });
    
          if (!user || !user.verificationCodeExpires ) {
            return res.status(404).json({ message: "Không tìm thấy tài khoản hoặc mã xác thực đã hết hạn." });
          }
    
          // Tạo mã xác thực mới và thời gian hết hạn mới
          const verificationCode = Math.floor(100000 + Math.random() * 900000);
          const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // Thời gian hết hạn sau 5 phút
    
          // Cập nhật thông tin mã xác thực mới vào người dùng
          user.verificationCode = verificationCode;
          user.verificationCodeExpires = expirationTime;
          await user.save();
    
          // Gửi lại mã xác thực mới cho người dùng
          res.status(200).json({ verificationCode: verificationCode });
        } catch (err) {
          res.status(500).json(err);
        }
    },

    //Tạo accessToken
    generateAccessToken: (user) => {
        return jwt.sign(
          {
            id: user.id,
            isAdmin: user.isAdmin,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "7d" }
        );
    },

    //Login
    loginUser: async (req, res) => {
        try {
            const user = await UserModel.findOne({ email: req.body.email });

            const validPassword = await bcrypt.compare(
              req.body.password,
              user.password
            );

            if (!validPassword || !user) {
              res.status(404).json("Incorrect password or email");
            }

            const isVerify = user.isVerify 

            if(isVerify == false){
                res.status(404).json("Account Invalid");
            }

            if (user && validPassword && isVerify == true) {      
                // Generate access token
                const accessToken = authController.generateAccessToken(user);

                res.status(200).json({ accessToken });
              }
        } catch (error) {
            res.status(500).json(err);
        }
    },
}

module.exports = authController;