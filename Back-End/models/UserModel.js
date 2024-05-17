const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,  
      maxlength: 50,   
      unique: true,    
      validate: {
        validator: function(value) {
          return validator.isEmail(value);  
        },
        message: props => `${props.value} is not a valid email!`  
      }
    },
    username: {
      type: String,
      required: true,  
      minlength: 5,
      maxlength: 20, 
    },    
    password: {
      type: String,
      required: true,  
      minlength: 6,    
    },
    profilePicture: {
      type: String,
      default: "https://static-00.iconduck.com/assets.00/user-avatar-1-icon-2048x2048-935gruik.png",
    },
    coverPicture: {
      type: String,
      default: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-anh-thien-nhien-dep-3d-002.jpg"
    },
    address:{
      type: String,
      default: ""
    },
    work:{
      type: String,
      default: ""
    },  
    blocked: {
      type: Array,
      default: []
    },
    blocking: {
      type: Array,
      default: []
    },
    friendRequested: {
      type: Array,
      default: []
    },
    friendRequesting: {
      type: Array,
      default: []
    },
    friends: {
      type: Array,
      default: []
    },
    friendsCount: {
      type: Number,
      default: 0
    },
    verificationCode: {
      type: String,
      default: null 
    },
    verificationCodeExpires: {
      type: Date,
      default: null  
    },
    isVerify: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }  
);

module.exports = mongoose.model("UserModel", userSchema);