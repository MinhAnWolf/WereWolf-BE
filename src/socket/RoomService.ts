import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Room } from "../type/Room";
import { RoomSchema } from "../entity/RoomSchema";
import { RoomDetail } from "../type/RoomDetail";
import { UserSchema } from "../entity/UserSchema";

export async function createRoom(
  socket: Socket,
  useridRequest: string,
  io: Server
) {
  socket.on("create-room", async (room: Room) => {
    const user = await UserSchema.findOne({
      $or: [{ userid: useridRequest }],
    });
    const data: Room = {
      roomId: uuidv4(),
      player: [useridRequest],
      roomName: room.roomName,
      roomOwner: user?.username as string,
      userIdOwner: useridRequest as string,
      slot: room.slot, // slot quy định
      type: room.type,
      status: "open", // trạng thái open - watting - in game
      clock: false,
    };
    await RoomSchema.create(data);
    socket.join(data.roomId as string);
    socket.emit("create-room", data.roomId);
    listRoom(io);
  });
}

export async function joinRoom(
  socket: Socket,
  useridRequest: string,
  io: Server
) {
  socket.on("join-room", async (room: Room) => {
    const roomIdReq = room.roomId as string;
    if (roomIdReq == null || roomIdReq == "" || roomIdReq == undefined) {
      return;
    }
    // Handle push user when join
    const oldRoom = await RoomSchema.findOne({
      $or: [{ roomId: roomIdReq }],
    });
    let reRoom: Room | any;
    // check oldRoom diff null
    if (oldRoom !== null) {
      // owner not push field player
      if (useridRequest !== oldRoom?.userIdOwner) {
        oldRoom?.player.push(useridRequest);
      }
      // check size oldRoom if add element then fetch new room
      let sizeBeforePush = oldRoom?.player.length;
      if (oldRoom?.player.length > sizeBeforePush) {
        reRoom = await RoomSchema.findOneAndUpdate(
          { roomIdReq },
          { $set: { userid: oldRoom?.player } },
          { new: true }
        );
      }

      let dataRomDetail: RoomDetail[] = [];
      // check player have data
      if (reRoom?.player !== undefined) {
        reRoom.player.forEach(async (item: any) => {
          console.log(item);

          const user = await UserSchema.findOne({
            $or: [{ userid: item }],
          });
          // SET DATA ROOM DETAIL
          dataRomDetail.push({
            userName: user?.username as string,
            avartar: user?.avartar as string,
            roomId: roomIdReq as string,
            userId: user?.userid as string,
          });
        });
      }
      const userReq = await UserSchema.findOne({
        $or: [{ userid: useridRequest }],
      });
      io.in(roomIdReq as string).emit("message-room", {
        message: userReq?.username + "đã tham gia",
        data: dataRomDetail,
      });
    }
  });
}

export async function leaveRoom(
  socket: Socket,
  roomId: string,
  io: Server,
  useridRequest: string
) {
  socket.on("leave-room", async () => {
    socket.leave(roomId);
    const room = await RoomSchema.findOne({ $or: [{ roomId: roomId }] });
    if (room) {
      let useridOld = room.player;
      let newUserid = useridOld.filter((item) => item != useridRequest);
      const reRoom = await RoomSchema.findOneAndUpdate(
        { roomId },
        { $set: { userid: newUserid } },
        { new: true }
      );
      let data: RoomDetail[] = [];
      if (reRoom) {
        for (let i = 0; i < reRoom.player.length; i++) {
          const user = await UserSchema.findOne({
            $or: [{ userid: room.player[i] }],
          });
          // SET DATA ROOM DETAIL
          data.push({
            userName: user?.username as string,
            avartar: user?.avartar as string,
            roomId: roomId as string,
            userId: room.player[i] as string,
          });
        }
      }
      const userReq = await UserSchema.findOne({
        $or: [{ userid: useridRequest }],
      });
      io.in(roomId as string).emit(
        "message-room",
        userReq?.username + "đã rời"
      );
      io.in(roomId as string).emit("leave-room", data);
    }
  });
}

export async function listRoom(io: Server) {
  console.log("list room");
  const rooms = await RoomSchema.find().lean();
  io.emit("list-room", rooms);
}

interface iMessagePrivate {
  message: string;
  resiverUser: string;
}

export async function messagePrivate(socket: Socket) {
  socket.on("message-private", async (request: iMessagePrivate) => {
    socket.to(request.resiverUser).emit("message-private", request.message);
  });
}

export function deleteRoom() {}

export function updateRoom() {}
