import { Schema, model } from "mongoose";
import { User } from "../model/User";

const roomSchema = new Schema({
  roomId: {
    type: String,
    require: true,
  },
  user: {
    type: [String],
    require: true,
  },
  roomOwner: {
    type: String,
    require: true,
  },
  slot: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  }
});

export const RoomSchema = model("Rooms", roomSchema);
