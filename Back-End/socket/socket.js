const { Server } = require('socket.io');

let io;

const socketConfig = (server) => {
  // Tạo một instance của Socket.IO
  io = new Server(server, {
    cors: {
      origin: "*",  // Bạn có thể giới hạn các domain nếu cần
      methods: ["GET", "POST"]
    }
  });

  // Sự kiện kết nối
  io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    // Sự kiện gửi tin nhắn
    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      // Phát lại tin nhắn cho tất cả các client
      io.emit('message', msg);
    });

    // Ngắt kết nối
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

const sendNotification = (receiverIds, notification) => {
  // Gửi thông báo đến những người nhận cụ thể
  receiverIds.forEach(userId => {
    io.to(userId).emit('notification', notification);
  });
};

module.exports = { socketConfig, sendNotification };
