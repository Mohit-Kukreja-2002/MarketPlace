import http from "http";
import { app } from '../app.js'
// import SocketService from './socketService.js'
import { Server } from "socket.io";

const server = http.createServer(app);

// const socketService = new SocketService();
// socketService.io.attach(server);
// socketService.initListeners();

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  
  const userId = socket.handshake.query.userId;
  // console.log("a user connected", socket.id,userId);
  if (userId !== undefined) userSocketMap[userId] = socket.id;

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    // console.log("User Disconnected")
  });
});

export { server, io };