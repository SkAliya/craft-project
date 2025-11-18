// import React from "react";
// import { getRooms } from "../api/api";

// type Room = {
//   id: string;
//   name: string;
//   baseHourlyRate: number;
//   capacity: number;
// };

// export default function RoomsPage() {
//   const [rooms, setRooms] = React.useState<Room[]>([]);

//   React.useEffect(() => {
//     getRooms().then(setRooms);
//   }, []);

//   return (
//     <div>
//       <h2>Rooms</h2>
//       <div style={{ display: "grid", gap: 10 }}>
//         {rooms.map((r) => (
//           <div key={r.id} style={{ border: "1px solid #ddd", padding: 10 }}>
//             <strong>{r.name}</strong>
//             <div>Rate: ₹{r.baseHourlyRate}/hr</div>
//             <div>Capacity: {r.capacity}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React from "react";
import { getRooms } from "../api/api";
import "../room.css";

type Room = {
  id: string;
  name: string;
  baseHourlyRate: number;
  capacity: number;
};

export default function RoomsPage() {
  const [rooms, setRooms] = React.useState<Room[]>([]);

  React.useEffect(() => {
    getRooms().then(setRooms);
  }, []);

  return (
    <div className="rooms-wrapper">
      <h2 className="page-title">Available Rooms</h2>

      <div className="rooms-grid">
        {rooms.map((r) => (
          <div key={r.id} className="room-card glass-card">
            <h3 className="room-name">{r.name}</h3>

            <div className="room-details">
              <p>
                <span className="label">Rate:</span> ₹{r.baseHourlyRate}/hr
              </p>
              <p>
                <span className="label">Capacity:</span> {r.capacity} people
              </p>
            </div>

            <button
              className="btn-primary room-btn"
              onClick={() => alert(`Selected Room: ${r.name}`)}
            >
              Select Room
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
