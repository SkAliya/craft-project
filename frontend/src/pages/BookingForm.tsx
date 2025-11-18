// import React from "react";
// import { getRooms, createBooking } from "../api/api";
// import dayjs from "dayjs";

// export default function BookingForm() {
//   const [rooms, setRooms] = React.useState<any[]>([]);
//   const [roomId, setRoomId] = React.useState<string>("");
//   const [userName, setUserName] = React.useState("");
//   const [start, setStart] = React.useState("");
//   const [end, setEnd] = React.useState("");
//   const [result, setResult] = React.useState<any>(null);

//   React.useEffect(() => {
//     getRooms().then((r) => {
//       setRooms(r);
//       if (r[0]) setRoomId(r[0].id);
//     });
//   }, []);

//   async function submit(e: React.FormEvent) {
//     e.preventDefault();
//     const payload = {
//       roomId,
//       userName,
//       startTime: dayjs(start).toISOString(),
//       endTime: dayjs(end).toISOString(),
//     };
//     const res = await createBooking(payload);
//     setResult(res);
//   }

//   return (
//     <div>
//       <h2>Book a room</h2>
//       <form
//         onSubmit={submit}
//         style={{ display: "grid", gap: 8, maxWidth: 500 }}
//       >
//         <label>
//           Room:
//           <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
//             {rooms.map((r) => (
//               <option value={r.id} key={r.id}>
//                 {r.name} (₹{r.baseHourlyRate}/hr)
//               </option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Name:
//           <input
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             required
//           />
//         </label>

//         <label>
//           Start (local):
//           <input
//             type="datetime-local"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//             required
//           />
//         </label>

//         <label>
//           End (local):
//           <input
//             type="datetime-local"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//             required
//           />
//         </label>

//         <button type="submit">Create booking</button>
//       </form>

//       <div style={{ marginTop: 12 }}>
//         <h3>Result</h3>
//         <pre>{result ? JSON.stringify(result, null, 2) : "No action yet"}</pre>
//       </div>
//     </div>
//   );
// }
// import React from "react";
// import { getRooms, createBooking } from "../api/api";
// import dayjs from "dayjs";

// // Import the Room type from backend shared types (recommended)
// import type { Room } from "../../../backend/src/models/types";

// interface BookingResponse {
//   bookingId: string;
//   roomId: string;
//   userName: string;
//   totalPrice: number;
//   status: string;
// }

// export default function BookingForm() {
//   const [rooms, setRooms] = React.useState<Room[]>([]);
//   const [roomId, setRoomId] = React.useState<string>("");
//   const [userName, setUserName] = React.useState("");
//   const [start, setStart] = React.useState("");
//   const [end, setEnd] = React.useState("");
//   const [result, setResult] = React.useState<BookingResponse | null>(null);

//   React.useEffect(() => {
//     getRooms().then((fetchedRooms) => {
//       setRooms(fetchedRooms);
//       if (fetchedRooms[0]) setRoomId(fetchedRooms[0].id);
//     });
//   }, []);

//   async function submit(e: React.FormEvent) {
//     e.preventDefault();
//     const payload = {
//       roomId,
//       userName,
//       startTime: dayjs(start).toISOString(),
//       endTime: dayjs(end).toISOString(),
//     };

//     const res = await createBooking(payload);
//     setResult(res);
//   }

//   return (
//     <div>
//       <h2>Book a room</h2>

//       <form
//         onSubmit={submit}
//         style={{ display: "grid", gap: 8, maxWidth: 500 }}
//       >
//         <label>
//           Room:
//           <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
//             {rooms.map((r) => (
//               <option value={r.id} key={r.id}>
//                 {r.name} (₹{r.baseHourlyRate}/hr)
//               </option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Name:
//           <input
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             required
//           />
//         </label>

//         <label>
//           Start (local):
//           <input
//             type="datetime-local"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//             required
//           />
//         </label>

//         <label>
//           End (local):
//           <input
//             type="datetime-local"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//             required
//           />
//         </label>

//         <button type="submit">Create booking</button>
//       </form>

//       <div style={{ marginTop: 12 }}>
//         <h3>Result</h3>
//         <pre>{result ? JSON.stringify(result, null, 2) : "No action yet"}</pre>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { getRooms, createBooking } from "../api/api";
import dayjs from "dayjs";
import "../booking.css"; // add this css file

import type { Room } from "../../../backend/src/models/types";

interface BookingResponse {
  bookingId: string;
  roomId: string;
  userName: string;
  totalPrice: number;
  status: string;
}

export default function BookingForm() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [roomId, setRoomId] = React.useState<string>("");
  const [userName, setUserName] = React.useState("");
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");
  const [result, setResult] = React.useState<BookingResponse | null>(null);

  React.useEffect(() => {
    getRooms().then((fetchedRooms) => {
      setRooms(fetchedRooms);
      if (fetchedRooms[0]) setRoomId(fetchedRooms[0].id);
    });
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      roomId,
      userName,
      startTime: dayjs(start).toISOString(),
      endTime: dayjs(end).toISOString(),
    };

    const res = await createBooking(payload);
    setResult(res);
  }

  return (
    <div className="booking-wrapper">
      <h2 className="page-title">Book a Room</h2>

      <div className="glass-card booking-card">
        <form onSubmit={submit} className="booking-form">
          {/* Room Selection */}
          <div className="form-group">
            <label>Room</label>
            <select
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
            >
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} (₹{r.baseHourlyRate}/hr)
                </option>
              ))}
            </select>
          </div>

          {/* Name */}
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          {/* Start */}
          <div className="form-group">
            <label>Start Time</label>
            <input
              type="datetime-local"
              required
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>

          {/* End */}
          <div className="form-group">
            <label>End Time</label>
            <input
              type="datetime-local"
              required
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>

          <button className="btn-primary" type="submit">
            Create Booking
          </button>
        </form>
      </div>

      {/* RESULT */}
      <div className="glass-card result-card">
        <h3 className="section-title">Result</h3>
        <pre className="result-box">
          {result ? JSON.stringify(result, null, 2) : "No action yet"}
        </pre>
      </div>
    </div>
  );
}
