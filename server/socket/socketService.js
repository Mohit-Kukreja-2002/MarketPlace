// import { Server } from "socket.io";
// import Redis from 'ioredis';
// import { redisClient, redisOptions } from '../utils/redis.js';

// const pub = new Redis(redisClient(), redisOptions);
// const sub = new Redis(redisClient(), redisOptions);

// class SocketService {
//     constructor() {
//         console.log("Init Socket Service...");
//         this._io = new Server({
//             cors: {
//                 allowedHeaders: ["*"],
//                 origin: "*",
//             },
//         });

//         // Initialize Redis clients for userSocketMap
//         this.redisClient = new Redis(redisClient(), redisOptions);
//         this.redisSubscriber = new Redis(redisClient(), redisOptions);
//         this.redisPublisher = new Redis(redisClient(), redisOptions);

//         // Subscribe to userSocketMap updates
//         this.redisSubscriber.subscribe("userSocketMapUpdate");
//         this.redisSubscriber.on("message", this.handleUserSocketMapUpdate.bind(this));
//     }

//     async handleUserSocketMapUpdate(channel, message) {
//         // Handle userSocketMap update received from Redis
//         const updatedUserSocketMap = JSON.parse(message);
//         // Update your local userSocketMap here
//         // You might also consider merging the received data with existing data
//     }

//     async updateUserSocketMap(userSocketMap) {
//         // Publish updated userSocketMap to Redis
//         await this.redisPublisher.publish("userSocketMapUpdate", JSON.stringify(userSocketMap));
//     }

//     async getUserSocketMap() {
//         // Retrieve userSocketMap from Redis
//         const userSocketMap = await this.redisClient.get("userSocketMap");
//         return JSON.parse(userSocketMap) || {};
//     }

//     initListeners() {
//         const io = this._io;
//         console.log("Init Socket Listeners...");

//         io.on("connect", async (socket) => {
//             const userId = socket.handshake.query.userId;
//             console.log(`New Socket Connected`, socket.id);
//             if (userId !== "undefined") {
//                 // Get the current userSocketMap from Redis
//                 const userSocketMap = await this.getUserSocketMap();
//                 userSocketMap[userId] = socket.id; // Update userSocketMap
//                 // Update the userSocketMap in Redis
//                 await this.updateUserSocketMap(userSocketMap);
//             }

//             socket.on("event:message", async ({ receiverId, message }) => {
//                 console.log("New Message Rec.", message);
//                 // publish this message to redis
//                 await pub.publish("MESSAGES", JSON.stringify({ receiverId, message }));
//             });

//             socket.on("disconnect", async () => {
//                 console.log("User disconnected", socket.id);
//                 const userId = socket.handshake.query.userId;
//                 if (userId !== "undefined") {
//                     // Get the current userSocketMap from Redis
//                     const userSocketMap = await this.getUserSocketMap();
//                     delete userSocketMap[userId]; // Remove user from userSocketMap upon disconnection
//                     // Update the userSocketMap in Redis
//                     await this.updateUserSocketMap(userSocketMap);
//                 }
//             });
//         });

//         sub.on("message", async (channel, message) => {
//             if (channel === "MESSAGES") {
//                 console.log("new message from redis", message);
//                 io.emit("message", message);
//                 console.log("Message Produced to Kafka Broker");
//             }
//         });
//     }

//     get io() {
//         return this._io;
//     }
// }

// export default SocketService;
