import { Request, Response } from "express";
import { RoomService } from "../services/roomService";

export function listRooms(req: Request, res: Response) {
  res.json(RoomService.list());
}
