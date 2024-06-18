import { Room } from "../type/Room";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../type/Player";
import { UserSchema } from "../entity/UserSchema";
import { User } from "../type/User";
import { Role } from "../type/Role";

export async function playGame(socket: Socket) {
  socket.on("play-game", async (roomDetail: Room, stage: string) => {
    checkSlot(roomDetail, socket);
    let countDay = 0;
    switch (stage) {
      case "start":
        let memoryRole = new Array<Number>();
        //create player and emit every player
        for (let index = 0; index < roomDetail.userId.length; index++) {
          let idUser = roomDetail.userId[index];
          let dataUser = await UserSchema.findById(idUser).exec();

          let dataPlayer: Player = {
            playerId: uuidv4(),
            roomId: roomDetail.roomId,
            username: dataUser?.username || "",
            roleName: "?",
          };
          memoryRole.push(handleRole());
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

function handleRole(memoryRole: Array<Number>, roomDetail: Room) {
  let slot = roomDetail.slot;
  let fullDataRole: Role;
  let rule5Slot = [8, 9, 1, 1, 1];
  let rule6Slot = [8, 9, 2, 1, 1, 1];
  let rule7Slot = [8, 9, 9, 1, 1, 1, 2];
  let rule8Slot = [8, 9, 9, 1, 1, 1, 2, 4];
  let rule9Slot = [8, 9, 9, 1, 1, 1, 1, 2, 4];
  let rule10Slot = [8, 9, 9, 1, 1, 1, 1, 2, 4, 3];

  if (memoryRole === null) {
    return randomRole(rule5Slot);
  }

  // check include
  randomRole(rule5Slot);
}

function randomRole(arr: number[]) {
  return Math.floor(Math.random() * arr.length);
}

function checkDuplicateRole(memoryRole: Array<number>, ruleSlot: number[]) {
  if () {
    
  }
}
