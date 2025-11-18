import { RoomService } from "./services/roomService";
import { v4 as uuidv4 } from "uuid";

export function seedDefaultRooms() {
  RoomService.seed([
    { id: "101", name: "Cabin 1", baseHourlyRate: 350, capacity: 4 },
    { id: "102", name: "Meeting Room A", baseHourlyRate: 500, capacity: 8 },
    { id: "103", name: "Conference Hall", baseHourlyRate: 1200, capacity: 20 },
  ]);
}
