export interface Room {
  roomId?: String;
  roomName?: String;
  userid?: [String] | null;
  roomOwner?: String;
  slot?: Number;
  type?: String;
  status?: String;
  clock?: Boolean;
  password?: String;
  stage?: String; // start - morning - night
}
