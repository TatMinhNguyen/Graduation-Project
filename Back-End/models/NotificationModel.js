const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true },  // Người gửi
  receiver: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true }], // Người nhận
  type: { type: String, required: true },  // Loại thông báo 
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'PostModel' },  // ID của bài viết liên quan (nếu có)
  commentId: {type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel'},
  type_felt: { type: String },
  message: { type: String },  // Nội dung thông báo
  read: { type: Boolean, default: false }
},
{ timestamps: true });

module.exports = mongoose.model('NotificationModel', notificationSchema);