export interface Room {
  roomId: String;
  userId: [String];
  roomOwner: String;
  slot: Number;
  type: String;
  status: String;
  clock: Boolean;
  password?: String;
}
