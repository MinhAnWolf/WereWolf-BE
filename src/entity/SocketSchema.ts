import { Schema, model } from "mongoose";

const socketSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  socketId: {
    type: String,
    require: true,
  },
});

export const SocketSchema = model("Sockets", socketSchema);
