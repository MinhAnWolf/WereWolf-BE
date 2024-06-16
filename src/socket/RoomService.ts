import { Socket } from "socket.io";
import { v4 as uuidv4 } from 'uuid';
import { Room } from "../model/Room";
import { RoomSchema } from "../entity/Room";

export function createRoom(socket: Socket) {
    socket.on("create_room", async (room: Room) => {
        console.log("inside - create_room");
        const data: Room = {
            roomId: uuidv4(),
            user: [room.roomOwner],
            roomOwner: room.roomOwner,
            slot: room.slot,
            type: room.type,
            status: "waitting"
        }
        await RoomSchema.create(data);
        await socket.emit("create_room", "create success and navigate detail room")
    });
}

export function joinRoom(socket: Socket) {
    console.log("inside - joinRoom");
    socket.on("join_room", async (roomId) => {
        await socket.emit("show_detail", RoomSchema.findOne({
            $or: [{ roomId: roomId }],
        }));
    });
}

export function listRoom(socket: Socket) {
    socket.on("list_room", async socket => {
        await socket.emit(RoomSchema.find());
    });
}

export function showDetailRoom(socket: Socket) {
    socket.on("show_detail", async (roomId = socket) => {
        await socket.emit("show_detail", RoomSchema.findOne({
            $or: [{ roomId: roomId }],
        }));
    });
}

export function deleteRoom() {

}

export function updateRoom() {

}