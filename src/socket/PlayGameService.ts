import { Room } from "../type/Room";
import { Socket, Server } from "socket.io";
import { RoleSchema } from "../entity/Role";
import { UserSchema } from "../entity/UserSchema";

export function readyGame(
  socket: Socket,
  io: Server,
  useridReq: string,
  roomId: string
) {
  socket.on("ready-game", async () => {
    const user = await UserSchema.findOne({
      $or: [{ userid: useridReq }],
    });
    socket.join(useridReq + "player");
    io.in(roomId).emit("message-room", user?.username + " đã sẵn sàng");
  });
}

export function playGame(socket: Socket, io: Server, useridReq: string) {
  socket.on("play-game", async (roomDetail: Room) => {
    let countDay = 0;
    switch (roomDetail.stage) {
      case "start":
        // ONLY OWNER ROOM ACTION START GAME
        const user = await UserSchema.findOne({
          $or: [{ userid: useridReq }],
        });
        if (user?.username !== roomDetail.roomOwner) {
          return;
        }
        let memoryRole: number[] = [];
        roomDetail.player?.forEach((item) => {
          // CREATE PLAYER ID
          socket.join(item + "player");
          // HANDLE ROLE
          // step 1: check slot room
          if (checkSlot(roomDetail, io)) {
            return;
          }
          // step 2: handle rule share role
          const rule: number[] | undefined = ruleRole(
            roomDetail.slot as number
          );
          if (rule === undefined) {
            return;
          }
          // step 3: random first
          // step 4: check duplicate role
          let playerRole = handleRole(memoryRole, rule).then((dataRoom) => {
            // step 5: add role in memory role
            memoryRole.push(dataRoom?.roleId as number);
          });
          // step 6: emit every player role by player id
          io.in(useridReq + "player").emit("role", playerRole);
        });
        // step 7: notification message "Complete the role division phase"
        io.in(roomDetail.roomId as string).emit(
          "message-room",
          "Complete the role division phase"
        );
        return;
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

function checkSlot(room: Room, io: Server) {
  if (!((room.slot as number) > 5 && (room.slot as number) <= 30)) {
    io.in(room.roomId as string).emit("message-room", "Not enough players");
    return true;
  }
  return false;
}

async function handleRole(memoryRole: number[], ruleRole: number[]) {
  // random for first time
  let random = Math.floor(Math.random() * ruleRole.length);
  if (memoryRole === null) {
    return await RoleSchema.findOne({
      $or: [{ roleId: random }],
    });
  }

  // check duplicate room
  if (checkDuplicate(memoryRole, random)) {
    random = reRandom(memoryRole, ruleRole);
  }
  return await RoleSchema.findOne({
    $or: [{ roleId: random }],
  });
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

function ruleRole(slot: number) {
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
