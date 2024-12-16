const { Server } = require('socket.io');

let io;
const userSocketMap = {}; // Lưu trữ ánh xạ giữa userId và socketId

const socketConfig = (server) => {
  // Khởi tạo một instance của Socket.IO
  io = new Server(server, {
    cors: {
      origin: "*", // Có thể giới hạn origin sau này
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: false,
    },
  });

  // Sự kiện kết nối
  io.on('connection', (socket) => {
    console.log(`User connected with socket ID: ${socket.id}`);

    // Đăng ký userId và ánh xạ với socketId
    socket.on('register', (userId) => {
      if (!userId) return; // Validate userId

      // Gán userId vào socket để xử lý disconnect dễ dàng hơn
      socket.userId = userId;
      userSocketMap[userId] = socket.id;

      console.log(`User ${userId} is mapped to socket ID ${socket.id}`);
    });

    socket.on('online', () => {
      emitOnlineUsers();
    })

    // Tham gia vào một phòng cụ thể
    socket.on('join-room', ({ roomId, peerId }) => {
      console.log(`User ${peerId} joined room ${roomId}`);
      socket.join(roomId);
      socket.broadcast.to(roomId).emit('user-connected', peerId);
    });

    socket.on('leave-room', ({ roomId, peerId }) => {
      console.log(`User ${peerId} left room ${roomId}`);
      
      // Broadcast cho các user khác trong room biết
      socket.to(roomId).emit('user-disconnected', peerId);
    
      // Rời khỏi room
      socket.leave(roomId);
    });   
    
    socket.on('end-call', ({ roomId }) => {
      console.log(`Call ended in room: ${roomId}`);
      socket.to(roomId).emit('end-call'); // Gửi sự kiện cho tất cả user trong room
    });
    

    // Xử lý ngắt kết nối
    socket.on('disconnect', () => {
      if (socket.userId) {
        delete userSocketMap[socket.userId];
        console.log(`User ${socket.userId} disconnected, socket ID ${socket.id} removed`);
        emitOnlineUsers();
      }
    });
  });

  // Phát danh sách online hiện tại
  const emitOnlineUsers = () => {
    io.emit('onlineUsers', Object.keys(userSocketMap));
  };
};

const sendNotification = (receiverIds, notification) => {
  emitToUsers(receiverIds, 'notification', notification);
};

const sendMessage = (receiverIds, message) => {
  emitToUsers(receiverIds, 'send-message', message);
};

const sendChats = (receiverIds) => {
  emitToUsers(receiverIds, 'send-chat');
};

// Hàm chung để gửi dữ liệu đến một hoặc nhiều user
const emitToUsers = (receiverIds, eventName, data = null) => {
  receiverIds.forEach((userId) => {
    const socketId = userSocketMap[userId];
    if (socketId) {
      io.to(socketId).emit(eventName, data);
      console.log(`Event '${eventName}' sent to userId ${userId} with socket ID ${socketId}`);
    } else {
      console.log(`User ${userId} is not connected`);
    }
  });
};

module.exports = { socketConfig, sendNotification, sendMessage, sendChats };
