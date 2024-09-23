const { Server } = require('socket.io');

let io;

let userSocketMap = {}; 

const socketConfig = (server) => {
  // Tạo một instance của Socket.IO
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",  // Bạn có thể giới hạn các domain nếu cần
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }
  });

  // Sự kiện kết nối
  io.on('connection', (socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);

    socket.on('register', (userId) => {
      userSocketMap[userId] = socket.id;  // Ánh xạ userId từ DB với socket.id
      console.log(`User ${userId} is mapped to socket ID ${socket.id}`);
    });

    // Ngắt kết nối
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
      // Xóa ánh xạ khi người dùng ngắt kết nối
      for (let userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          console.log(`Socket ID ${socket.id} removed for user ${userId}`);
        }
      }
    });
  });
};

const sendNotification = (receiverIds, notification) => {
  receiverIds.forEach(userId => {
    const socketId = userSocketMap[userId];  // Lấy socket.id từ ánh xạ userId
    if (socketId) {
      io.to(socketId).emit('notification', notification);  // Gửi thông báo tới client
      console.log(`Notification sent to userId ${userId} with socket ID ${socketId}`);
    } else {
      console.log(`User ${userId} is not connected`);
    }
  });
};

module.exports = { socketConfig, sendNotification };
