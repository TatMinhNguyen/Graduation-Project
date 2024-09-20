const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const http = require('http');  
const { Server } = require('socket.io');

const app = express();
dotenv.config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const friendRoute = require("./routes/friend");
const postRoute = require('./routes/post');
const commentRoute = require("./routes/comment"); 
const searchRoute = require('./routes/search');
const chatRoute = require('./routes/chat')
const notificationRoute = require('./routes/notification')

const path = require("path");
const imagekit = require("./utils/imagekitConfig");

// Tạo HTTP server từ Express
const server = http.createServer(app);  // Thay app.listen bằng server.listen

// Tích hợp Socket.IO với server
const io = new Server(server, {
  cors: {
    origin: "*",  // Hoặc bạn có thể chỉ định các domain cụ thể được phép kết nối WebSocket
    methods: ["GET", "POST"]
  }
});

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Endpoint để phục vụ file tĩnh
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/authentication', (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/friend", friendRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute)
app.use('/api/search', searchRoute)
app.use('/api/chat', chatRoute)
app.use('/api/notification', notificationRoute)

// Lắng nghe sự kiện kết nối từ Socket.IO
io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // Nhận và gửi dữ liệu qua WebSocket
  socket.on('message', (msg) => {
    console.log('Message received:', msg);
    // Phát lại tin nhắn cho tất cả các client
    io.emit('message', msg);
  });

  // Xử lý ngắt kết nối
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Chạy server trên cổng 8000
server.listen(process.env.PORT || 8000, () => {
  console.log("Server is running");
});
