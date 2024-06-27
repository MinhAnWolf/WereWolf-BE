import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Room } from "../type/Room";
import { RoomSchema } from "../entity/RoomSchema";
import { RoomDetail } from "../type/RoomDetail";
import { UserSchema } from "../entity/UserSchema";

export async function createRoom(socket: Socket, useridRequest: string) {
  socket.on("create_room", async (room: Room) => {
    const user = await UserSchema.findOne({
      $or: [{ userid: useridRequest }],
    });
    const data: Room = {
      roomId: uuidv4(),
      userid: [useridRequest],
      roomOwner: user?.username as string,
      slot: room.slot, // slot quy định
      type: room.type,
      status: "open", // trạng thái open - watting - in game
      clock: false,
    };
    socket.join(data.roomId as string);
    await RoomSchema.create(data);
    listRoom(socket);
  });
}

export async function joinRoom(
  socket: Socket,
  useridRequest: string,
  io: Server
) {
  socket.on("join_room", async (roomReq: Room) => {
    await socket.join(roomReq.roomId as string);
    let roomId = roomReq.roomId;
    console.log(roomId);
    // FIND ONE ROOM
    const room = await RoomSchema.findOne({ $or: [{ roomId: roomId }] });

    if (room) {
      // AVOID ADD OWNER ROOM MORE OR USER EXIST ROOM
      const user = await UserSchema.findOne({
        $or: [{ userid: useridRequest }],
      });
      if (
        user?.username != room.roomOwner ||
        !room.userid.includes(useridRequest)
      ) {
        room.userid.push(useridRequest);
      }
      const reRoom = await RoomSchema.findOneAndUpdate(
        { roomId },
        { $set: { userid: room.userid } },
        { new: true }
      );
      let data: RoomDetail[] = [];
      if (reRoom) {
        for (let i = 0; i < reRoom.userid.length; i++) {
          const user = await UserSchema.findOne({
            $or: [{ userid: room.userid[i] }],
          });
          // SET DATA ROOM DETAIL
          data.push({
            userName: user?.username as string,
            avartar: user?.avartar as string,
            roomId: roomId as string,
            userId: room.userid[i] as string,
          });
        }
      }
      const userReq = await UserSchema.findOne({
        $or: [{ userid: useridRequest }],
      });
      io.in(roomId as string).emit(
        "message-room",
        userReq?.username + "đã tham gia"
      );
      io.in(roomId as string).emit("join_room", data);
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
      let useridOld = room.userid;
      let newUserid = useridOld.filter((item) => item != useridRequest);
      const reRoom = await RoomSchema.findOneAndUpdate(
        { roomId },
        { $set: { userid: newUserid } },
        { new: true }
      );
      let data: RoomDetail[] = [];
      if (reRoom) {
        for (let i = 0; i < reRoom.userid.length; i++) {
          const user = await UserSchema.findOne({
            $or: [{ userid: room.userid[i] }],
          });
          // SET DATA ROOM DETAIL
          data.push({
            userName: user?.username as string,
            avartar: user?.avartar as string,
            roomId: roomId as string,
            userId: room.userid[i] as string,
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

export async function listRoom(socket: Socket) {
  const rooms = await RoomSchema.find().lean();
  socket.emit("list-room", rooms);
}

export function deleteRoom() {}

export function updateRoom() {}
