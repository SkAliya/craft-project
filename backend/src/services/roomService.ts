import { rooms } from "../models/store";
import { Room } from "../models/types";

export const RoomService = {
  list: (): Room[] => rooms,
  get: (id: string) => rooms.find((r) => r.id === id),
  seed: (seedRooms: Room[]) => {
    rooms.length = 0;
    seedRooms.forEach((r) => rooms.push(r));
  },
};
