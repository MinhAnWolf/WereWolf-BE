import { Room } from "../type/Room";
import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Player } from "../type/Player";

export function playGame(socket: Socket) {
  socket.on("play-game", async (roomDetail: Room, stage: string) => {
    checkSlot(roomDetail, socket);
    let countDay = 0;
    let listPlayer = new Array<Player>();
    switch (stage) {
      case "start":
        let randomRole = Math.floor(Math.random() * (49 - 0 + 1)) + 0;
        //create player
        for (let index = 0; index < (roomDetail.slot as number); index++) {
          let dataPlayer: Player = {
            playerId: uuidv4(),
            roomId: roomDetail.roomId,
            userName: "?",
            socketId: "?",
            roleName: "?",
          };

          listPlayer.push(dataPlayer);
        }

        return listPlayer;
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
