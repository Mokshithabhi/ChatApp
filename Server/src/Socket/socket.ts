import { Server, Socket } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE"],
  },
});

const userSocketMap: Record<string, string> = {}; 
const groupSocketMap: Record<string, Set<string>> = {}; 

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};


io.on("connection", (socket: Socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId as string;

  if (userId !== "undefined") {
    userSocketMap[userId] = socket.id;
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("joinGroup", (conversationId: string) => {
    socket.join(conversationId); 
    if (!groupSocketMap[conversationId]) {  
      groupSocketMap[conversationId] = new Set();
    }
    groupSocketMap[conversationId].add(socket.id);
    console.log(`User ${userId} joined group ${conversationId}`);
  });

  socket.on("sendGroupMessage", (messageData) => {
    const { conversationId, senderId, message } = messageData;

    io.to(conversationId).emit("newGroupMessage", {
      senderId,
      message,
      timestamp: new Date(),
    });
    console.log(`Message sent to group ${conversationId}:`, message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
