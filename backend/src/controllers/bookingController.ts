import { Request, Response } from "express";
import { BookingService } from "../services/bookingService";

export async function createBooking(req: Request, res: Response) {
  try {
    const { roomId, userName, startTime, endTime } = req.body;
    const booking = BookingService.create(roomId, userName, startTime, endTime);
    res.status(201).json({
      bookingId: booking.id,
      roomId: booking.roomId,
      userName: booking.userName,
      totalPrice: booking.totalPrice,
      status: booking.status,
    });
  } catch (err: any) {
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal error" });
  }
}

export async function cancelBooking(req: Request, res: Response) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Booking ID is required" });
    }

    const booking = BookingService.cancel(id);
    return res
      .status(200)
      .json({ success: true, bookingId: booking.id, status: booking.status });
  } catch (err: any) {
    return res
      .status(err.status || 500)
      .json({ error: err.message || "Internal error" });
  }
}
