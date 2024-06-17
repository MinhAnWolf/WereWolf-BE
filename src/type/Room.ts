export interface Room {
  roomId: String;
  user: [String];
  roomOwner: String;
  socketId: [String];
  slot: Number;
  type: String;
  status: String;
  clock: Boolean;
  password?: String;
}
