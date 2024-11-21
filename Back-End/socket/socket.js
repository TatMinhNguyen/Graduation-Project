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

    // Nhận tín hiệu offer và chuyển tiếp
    socket.on("send-offer", ({ offer, to, from }) => {
      const receiverSocketId = userSocketMap[to]; // Lấy socket.id của người nhận
      if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive-offer", { offer, from });
          console.log(`Forwarded offer from ${from} to ${to}`);
      } else {
          console.error(`User ${to} is not connected`);
      }
  });
  

    // Nhận tín hiệu answer và chuyển tiếp
    socket.on("send-answer", ({ answer, to }) => {
      const receiverSocketId = userSocketMap[to]; // Lấy socket.id của người nhận
      if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive-answer", { answer, from: socket.id });
          console.log(`Forwarded answer from ${socket.id} to ${to}`);
      } else {
          console.error(`User ${to} is not connected`);
      }
    });

    // Nhận ICE candidate và chuyển tiếp
    socket.on("send-candidate", ({ candidate, to }) => {
        const receiverSocketId = userSocketMap[to]; // Lấy socket.id của người nhận
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive-candidate", { candidate, from: socket.id });
            console.log(`Forwarded candidate from ${socket.id} to ${to}`);
        } else {
            console.error(`User ${to} is not connected`);
        }
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

const sendMessage = (receiverIds, message) => {
  receiverIds.forEach(userId => {
    const socketId = userSocketMap[userId];
    if(socketId) {
      io.to(socketId).emit('send-message', message);
      console.log(`Message sent to userId ${userId} with socket ID ${socketId}`);
    } else {
      console.log(`User ${userId} is not connected`);
    }
  })
}

const sendChats = (receiverIds) => {
  receiverIds.forEach(userId => {
    const socketId = userSocketMap[userId];
    if(socketId) {
      io.to(socketId).emit('send-chat');
      console.log(`Message sent to userId ${userId} with socket ID ${socketId}`);
    } else {
      console.log(`User ${userId} is not connected`);
    }
  })
}

module.exports = { socketConfig, sendNotification, sendMessage, sendChats };
