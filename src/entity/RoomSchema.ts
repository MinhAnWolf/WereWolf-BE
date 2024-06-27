import { Schema, model } from "mongoose";

const roomSchema = new Schema({
  roomId: {
    type: String,
    require: true,
  },
  userid: {
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
  },
  clock: {
    type: Boolean,
    require: true,
  },
});

export const RoomSchema = model("Rooms", roomSchema);
