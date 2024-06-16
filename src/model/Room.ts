import { User } from "./User";

export interface Room {
  roomId: String
  user: [String],
  roomOwner: String,
  slot: Number,
  type: String, 
  status: String
}
