import { io } from "socket.io-client";

// URL server Socket.IO (sử dụng môi trường nếu cần)
const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:8000";
// console.log(SOCKET_URL)

// Kết nối tới server Socket.IO
const socket = io(SOCKET_URL, {
  withCredentials: true,
});

// Xuất socket để sử dụng ở các nơi khác
export default socket;
