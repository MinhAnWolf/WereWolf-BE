import { Room } from "../type/Room";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../type/Player";
import { UserSchema } from "../entity/UserSchema";
import { User } from "../type/User";
import { Role } from "../type/Role";
import { readFileYml } from "../core/utils/Utilities";
import { RoleResponse } from "../type/RoleResponse";
import { RoleSchema } from "../entity/Role";

export async function playGame(socket: Socket) {
  socket.on("play-game", async (roomDetail: Room, stage: string) => {
    checkSlot(roomDetail, socket);
    let countDay = 0;
    switch (stage) {
      case "start":
        let memoryRole: number[] = [];
        //create player and emit every player
        for (let index = 0; index < roomDetail.userId.length; index++) {
          let idUser = roomDetail.userId[index];
          let dataUser = await UserSchema.findById(idUser).exec();
          let slotRequest: number[] =
            findRoleBySlot(roomDetail.slot as number) || [];
           const resultRole = await handleRole(memoryRole, slotRequest)
          if (resultRole && resultRole.roleId != null) {
            const roleId = Number(resultRole.roleId);
            if (!isNaN(roleId)) {
              memoryRole.push(roleId);
            }   
          }
          let uuid = uuidv4();
          let dataPlayer: Player = {
            playerId: uuid,
            roomId: roomDetail.roomId,
            username: dataUser?.username || "",
            role: {
              idRole: Number(resultRole?.roleId),
              nameRole: resultRole?.roleName as string
            },
          };
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

async function handleRole(memoryRole: number[], defaultSlot: number[]) {
  let random = Math.floor(Math.random() * defaultSlot.length);
  if (memoryRole === null) {
    return await RoleSchema.findOne({
      $or: [{ roleId: random }],
    });;
  }

  if (checkDuplicate(memoryRole, random)) {
    random = reRandom(memoryRole, defaultSlot);
  }
  return await RoleSchema.findOne({
    $or: [{ roleId: random }],
  });;
}

function checkDuplicate(memoryRole: number[], value: number) {
  return memoryRole.includes(value);
}

function reRandom(memoryRole: number[], defaultSlot: number[]) {
  let random = Math.floor(Math.random() * defaultSlot.length);

  if (checkDuplicate(memoryRole, random)) {
   reRandom(memoryRole, defaultSlot);
  }
  return random;
}

function findRoleBySlot(slot: number) {
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
