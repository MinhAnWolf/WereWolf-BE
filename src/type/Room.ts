export interface Room {
  roomId?: String;
  userid?: [String];
  roomOwner?: String;
  slot?: Number;
  type?: String;
  status?: String;
  clock?: Boolean;
  password?: String;
  stage?: String; // start - morning - night
}
