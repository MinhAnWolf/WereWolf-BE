import { Room } from "../type/Room";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../type/Player";
import { UserSchema } from "../entity/UserSchema";
import { User } from "../type/User";
import { Role } from "../type/Role";
import { readFileYml } from "../core/utils/Utilities";


export async function playGame(socket: Socket) {
  socket.on("play-game", async (roomDetail: Room, stage: string) => {
    checkSlot(roomDetail, socket);
    let countDay = 0;
    switch (stage) {
      case "start":
        
        let memoryRole = new Map<String, String>();
        //create player and emit every player
        for (let index = 0; index < roomDetail.userId.length; index++) {
          let idUser = roomDetail.userId[index];
          let dataUser = await UserSchema.findById(idUser).exec();
          let slotRequest:number[] = findRoleBySlot(roomDetail.slot as number) || [];
          const role = handleRole(memoryRole, roomDetail, slotRequest);
          let uuid = uuidv4();
          let dataPlayer: Player = {
            playerId: uuid,
            roomId: roomDetail.roomId,
            username: dataUser?.username || "",
            role: role,
          };
          memoryRole.set()
          socket.to(idUser as string).emit("player-data", dataPlayer);
        }

        return 0;
      case "morning":
        // cộng nữa ngày
        countDay += 0.5;
        return;
      case "night":
        // cộng nữa ngày
        countDay += 0.5;
        return;
      default:
        break;
    }
  });
}

function checkSlot(room: Room, socket: Socket) {
  if (!((room.slot as number) > 5 && (room.slot as number) <= 30)) {
    socket.to(room.roomId as string).emit("Not enough players");
  }
}

function handleRole(memoryRole: Map<String, String>, roomDetail: Room, defaultSlot:number[]) {
  let slot = roomDetail.slot;
  let fullDataRole: Role = readFileYml("role.yaml") as Role;
  
  if (memoryRole === null) {
    return randomRole(defaultSlot);
  }

  // check include
  randomRole(defaultSlot);
}

function randomRole(arr: number[]) {
  checkDuplicateRole()
  return Math.floor(Math.random() * arr.length);
}

function checkDuplicateRole(memoryRole: Array<number>, ruleSlot: number[]) {
  if () {
    
  }
}

function findRoleBySlot(slot:number) {
  let default5Slot = [8, 9, 1, 1, 1];
  let default6Slot = [8, 9, 2, 1, 1, 1];
  let default7Slot = [8, 9, 9, 1, 1, 1, 2];
  let default8Slot = [8, 9, 9, 1, 1, 1, 2, 4];
  let default9Slot = [8, 9, 9, 1, 1, 1, 1, 2, 4];
  let default10Slot = [8, 9, 9, 1, 1, 1, 1, 2, 4, 3];

  switch (slot) {
    case 5:
      return default5Slot;
    case 6:
      return default6Slot;
    case 7:
      return default7Slot;
    case 8:
      return default8Slot;
    case 9:
      return default9Slot;
    case 10:
      return default10Slot;
    default:
      break;
  }
}
