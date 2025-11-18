import { bookings } from "../models/store";
import { Booking } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { computePrice } from "../utils/pricing";
import { RoomService } from "./roomService";

import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

const MAX_DURATION_HOURS = 12;

function overlaps(
  aStart: dayjs.Dayjs,
  aEnd: dayjs.Dayjs,
  bStart: dayjs.Dayjs,
  bEnd: dayjs.Dayjs
) {
  // overlap unless aEnd <= bStart or bEnd <= aStart
  return !(aEnd.isSameOrBefore(bStart) || bEnd.isSameOrBefore(aStart));
}

export const BookingService = {
  list: () => bookings,
  get: (id: string) => bookings.find((b) => b.id === id),
  create: (
    roomId: string,
    userName: string,
    startIso: string,
    endIso: string
  ) => {
    const room = RoomService.get(roomId);
    if (!room) throw { status: 400, message: "Room not found" };
    const start = dayjs(startIso);
    const end = dayjs(endIso);
    if (!start.isValid() || !end.isValid())
      throw { status: 400, message: "Invalid date format" };
    if (!start.isBefore(end))
      throw { status: 400, message: "startTime must be < endTime" };
    const durationHours = end.diff(start, "minute") / 60;
    if (durationHours > MAX_DURATION_HOURS)
      throw { status: 400, message: "Duration exceeds 12 hours" };

    // check conflicts with existing CONFIRMED bookings
    const existing = bookings.filter(
      (b) => b.roomId === roomId && b.status === "CONFIRMED"
    );
    for (const b of existing) {
      const bStart = dayjs(b.startTime);
      const bEnd = dayjs(b.endTime);
      if (overlaps(start, end, bStart, bEnd)) {
        // format a user-friendly time window
        throw {
          status: 409,
          message: `Room already booked from ${bStart.format(
            "YYYY-MM-DD HH:mm"
          )} to ${bEnd.format("YYYY-MM-DD HH:mm")}`,
        };
      }
    }

    const totalPrice = computePrice(
      start.toISOString(),
      end.toISOString(),
      room.baseHourlyRate
    );
    const booking: Booking = {
      id: uuidv4(),
      roomId,
      userName,
      startTime: start.toISOString(),
      endTime: end.toISOString(),
      totalPrice,
      status: "CONFIRMED",
      createdAt: dayjs().toISOString(),
    };
    bookings.push(booking);
    return booking;
  },

  cancel: (id: string) => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) throw { status: 404, message: "Booking not found" };
    if (booking.status === "CANCELLED")
      throw { status: 400, message: "Booking already cancelled" };

    const start = dayjs(booking.startTime);
    const now = dayjs();
    const diffHours = start.diff(now, "hour", true);
    if (diffHours <= 2)
      throw {
        status: 400,
        message: "Cancellations are allowed only if >2 hours before startTime",
      };

    booking.status = "CANCELLED";
    booking.cancelledAt = dayjs().toISOString();
    booking.cancellationReason = "User requested";
    return booking;
  },
};
