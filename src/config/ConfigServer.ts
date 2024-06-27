import { Server, Socket } from "socket.io";
import Database from "./Database";
const express = require("express");
const app = express();
const { createServer } = require("http");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
  },
  // path: "/socket.io?auth",
});
import { createRoom, joinRoom, listRoom } from "../socket/RoomService";
import { playGame, readyGame } from "../socket/PlayGameService";

class ConfigServer {
  setUpServer = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    let port = process.env.PORT;
    httpServer.listen(9999, () => {
      console.log("Server is running on http://localhost:" + port + "/");
      const database = new Database();
      database.connectDb();
    });

    io.on("connect", (socket: Socket) => {
      console.log("Socket on port : " + port);
      const userId = socket.handshake.headers.userid;
      const roomId = socket.handshake.headers.roomid;
      if (roomId) {
        socket.join(roomId as string);
      }
      socket.join(userId as string);
      socket.emit("message", `Wellcom ${socket.id} to nodejs socket.io`);
      createRoom(socket, userId as string);
      joinRoom(socket, userId as string, io);
      listRoom(socket);
      readyGame(socket, io, userId as string, roomId as string);
      playGame(socket, io, userId as string);
    });
  };
}

export { app, ConfigServer, io };
