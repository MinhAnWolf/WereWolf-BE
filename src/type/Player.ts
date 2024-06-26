import { RoleResponse } from "./RoleResponse";

export interface Player {
  playerId: String;
  roomId: String;
  username: String;
  role: RoleResponse;
}
