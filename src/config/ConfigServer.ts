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
import {
  createRoom,
  joinRoom,
  // listRoom,
  showDetailRoom,
} from "../socket/RoomService";

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
      console.log(userId); 
      socket.join(userId as string);
      socket.emit("message", `Wellcom ${socket.id} to nodejs socket.io`);
      createRoom(socket, userId as string);
      joinRoom(socket);
      // listRoom(socket);
      showDetailRoom(socket);
    });
  };
}

export { app, ConfigServer, io };
