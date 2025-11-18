export type Room = {
  id: string;
  name: string;
  baseHourlyRate: number; // in rupees
  capacity: number;
};

export type BookingStatus = "CONFIRMED" | "CANCELLED";

export type Booking = {
  id: string;
  roomId: string;
  userName: string;
  startTime: string; // ISO
  endTime: string; // ISO
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
  cancelledAt?: string;
  cancellationReason?: string;
};
