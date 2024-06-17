import { Schema, model } from "mongoose";

const playerSchema = new Schema({
  playerId: {
    type: String,
    require: true,
  },
  roomId: {
    type: String,
    require: true,
  },
  userName: {
    type: Boolean,
    require: true,
  },
  roomOwner: {
    type: Boolean,
    require: true,
  },
  socketId: {
    type: Boolean,
    require: true,
  },
  roleName: {
    type: Boolean,
    require: true,
  },
});

export const PlayerSchema = model("Player", playerSchema);
