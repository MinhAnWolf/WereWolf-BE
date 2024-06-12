import { Socket } from "socket.io";
import Database from "./Database";
const express = require('express');
const os = require('os');
const app = express();
const { createServer } = require("http")
const { Server } = require("socket.io")
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: true
    },
    path: "/test/socket.io"
})

class ConfigServer {
    setUpServer = () => {
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
    
        let port = process.env.PORT;
        httpServer.listen(port, () => {
            console.log('Server is running on http://' + os.hostname + ':' + port);
            const database = new Database();
            database.connectDb();
        })
    
        io.on("connect", (socket:Socket) => {
            console.log('Socket on port : ' + port);
            socket.emit('message', `Wellcom ${socket.id} to nodejs socket.io`);
        })
    }
}



export {app, ConfigServer, io};

