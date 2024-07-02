import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { Room } from "../type/Room";
import { RoomSchema } from "../entity/RoomSchema";
import { RoomDetail } from "../type/RoomDetail";
import { UserSchema } from "../entity/UserSchema";

export async function createRoom(socket: Socket, useridRequest: string) {
  socket.on("create-room", async (room: Room) => {
    console.log(room);
    const user = await UserSchema.findOne({
      $or: [{ userid: useridRequest }],
    });
    const data: Room = {
      roomId: uuidv4(),
      userid: null,
      roomName: room.roomName,
      roomOwner: user?.username as string,
      slot: room.slot, // slot quy định
      type: room.type,
      status: "open", // trạng thái open - watting - in game
      clock: false,
    };
    await RoomSchema.create(data);
    socket.emit("create-room", data.roomId);
  });
}

export async function joinRoom(
  socket: Socket,
  useridRequest: string,
  io: Server
) {
  socket.on("join-room", async (roomIdReq: string) => {
    await socket.join(roomIdReq);
    const reRoom = await RoomSchema.findOneAndUpdate(
      { roomIdReq },
      { $set: { userid: useridRequest } },
      { new: true }
    );
    let data: RoomDetail[] = [];
    if (reRoom) {
      for (let i = 0; i < reRoom.userid.length; i++) {
        const user = await UserSchema.findOne({
          $or: [{ userid: reRoom.userid[i] }],
        });
        // SET DATA ROOM DETAIL
        data.push({
          userName: user?.username as string,
          avartar: user?.avartar as string,
          roomId: roomIdReq as string,
          userId: user?.userid as string,
        });
      }
    }
    const userReq = await UserSchema.findOne({
      $or: [{ userid: useridRequest }],
    });
    io.in(roomIdReq as string).emit(
      "message-room",
      userReq?.username + "đã tham gia"
    );
    io.in(roomIdReq as string).emit("join-room", data);
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
