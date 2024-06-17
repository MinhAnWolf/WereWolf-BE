import { NextFunction } from "express";
import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";

function socketFilter(
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) {
  console.log("filter socket");
  next();
}

export default socketFilter;
