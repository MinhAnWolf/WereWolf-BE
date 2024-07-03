export interface Room {
  roomId?: String;
  roomName?: String;
  player?: [String];
  roomOwner?: String;
  userIdOwner?: String;
  slot?: Number;
  type?: String;
  status?: String;
  clock?: Boolean;
  password?: String;
  stage?: String; // start - morning - night
}
