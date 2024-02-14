import express from "express";
import http, { Server as HttpServer } from "http";
import cors from "cors";
import { Server as SocketIoServer, Socket } from "socket.io";

const app = express();
const server: HttpServer = http.createServer(app);

app.use(cors());

const io: SocketIoServer = new SocketIoServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data: string) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data: { room: string; author: string; message: string; time: string }) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Server running at port 3001");
});
