// import { bookings } from "../models/store";
// import dayjs from "dayjs";
// import { RoomService } from "./roomService";

// export const AnalyticsService = {
//   get: (fromIso: string, toIso: string) => {
//     const from = dayjs(fromIso);
//     const to = dayjs(toIso).endOf("day");
//     const confirmed = bookings.filter((b) => b.status === "CONFIRMED");
//     const byRoom: Record<
//       string,
//       { totalMinutes: number; totalRevenue: number }
//     > = {};
//     for (const b of confirmed) {
//       const s = dayjs(b.startTime);
//       const e = dayjs(b.endTime);
//       // if booking overlaps the range, include the overlapping portion
//       const overlapStart = s.isAfter(from) ? s : from;
//       const overlapEnd = e.isBefore(to) ? e : to;
//       if (overlapEnd.isAfter(overlapStart)) {
//         const mins = overlapEnd.diff(overlapStart, "minute");
//         byRoom[b.roomId] = byRoom[b.roomId] || {
//           totalMinutes: 0,
//           totalRevenue: 0,
//         };
//         // byRoom[b.roomId] ??= { totalMinutes: 0, totalRevenue: 0 };

//         byRoom[b.roomId].totalMinutes += mins;
//         // revenue proportionally assign (price * minutes_of_overlap / total_minutes_of_booking)
//         const bookingMinutes = e.diff(s, "minute");
//         const revenueShare =
//           (b.totalPrice * mins) / Math.max(1, bookingMinutes);
//         byRoom[b.roomId].totalRevenue += revenueShare;
//       }
//     }

//     const rows = Object.entries(byRoom).map(([roomId, data]) => {
//       const room = RoomService.get(roomId);
//       return {
//         roomId,
//         roomName: room?.name || roomId,
//         totalHours: Math.round((data.totalMinutes / 60) * 10) / 10, // 1 decimal
//         totalRevenue: Math.round(data.totalRevenue),
//       };
//     });
//     return rows;
//   },
// };

import { bookings } from "../models/store";
import dayjs from "dayjs";
import { RoomService } from "./roomService";

export const AnalyticsService = {
  get: (fromIso: string, toIso: string) => {
    const from = dayjs(fromIso);
    const to = dayjs(toIso).endOf("day");

    // confirmed bookings only
    const confirmed = bookings.filter((b) => b.status === "CONFIRMED");

    // analytics data bucket
    const byRoom: Record<
      string,
      { totalMinutes: number; totalRevenue: number }
    > = {};

    for (const b of confirmed) {
      const s = dayjs(b.startTime);
      const e = dayjs(b.endTime);

      // compute overlapping window
      const overlapStart = s.isAfter(from) ? s : from;
      const overlapEnd = e.isBefore(to) ? e : to;

      if (overlapEnd.isAfter(overlapStart)) {
        const mins = overlapEnd.diff(overlapStart, "minute");

        // ⬇️ SAFE INITIALIZATION
        const roomStats =
          byRoom[b.roomId] ??
          (byRoom[b.roomId] = { totalMinutes: 0, totalRevenue: 0 });

        // add used minutes
        roomStats.totalMinutes += mins;

        // proportional revenue calculation
        const bookingMinutes = e.diff(s, "minute");
        const revenueShare =
          (b.totalPrice * mins) / Math.max(1, bookingMinutes);

        roomStats.totalRevenue += revenueShare;
      }
    }

    // transform analytics into rows
    const rows = Object.entries(byRoom).map(([roomId, data]) => {
      const room = RoomService.get(roomId);
      return {
        roomId,
        roomName: room?.name ?? roomId,
        totalHours: Math.round((data.totalMinutes / 60) * 10) / 10, // 1 decimal
        totalRevenue: Math.round(data.totalRevenue),
      };
    });

    return rows;
  },
};
