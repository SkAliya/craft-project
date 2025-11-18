// // import React from "react";
// // import { cancelBooking, getAnalytics } from "../api/api";

// // interface Booking {
// //   id: string;
// //   roomId: string;
// //   userName: string;
// //   startTime: string;
// //   endTime: string;
// //   totalPrice: number;
// //   status: string;
// // }

// // interface AnalyticsRow {
// //   roomId: string;
// //   roomName: string;
// //   totalHours: number;
// //   totalRevenue: number;
// // }
// // export default function AdminView() {
// //   const [bookings, setBookings] = React.useState<Booking[]>([]);
// //   const [from, setFrom] = React.useState("");
// //   const [to, setTo] = React.useState("");
// //   const [analytics, setAnalytics] = React.useState<AnalyticsRow[]>([]);

// //   React.useEffect(() => {
// //     // fetch bookings (we store in-memory, but backend has bookings array; add a /api/bookings GET if needed)
// //     fetch("/api/bookings")
// //       .then((r) => r.json())
// //       .then(setBookings);
// //   }, []);

// //   async function doCancel(id: string) {
// //     const res = await cancelBooking(id);
// //     alert(JSON.stringify(res));
// //     // reload bookings
// //     fetch("/api/bookings")
// //       .then((r) => r.json())
// //       .then(setBookings);
// //   }

// //   async function fetchAnalytics() {
// //     const rows = await getAnalytics(from, to);
// //     setAnalytics(rows);
// //   }

// //   return (
// //     <div>
// //       <h2>Admin</h2>
// //       <section>
// //         <h3>Bookings</h3>
// //         <table border={1} cellPadding={6}>
// //           <thead>
// //             <tr>
// //               <th>ID</th>
// //               <th>Room</th>
// //               <th>User</th>
// //               <th>Start</th>
// //               <th>End</th>
// //               <th>Price</th>
// //               <th>Status</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {bookings.map((b) => (
// //               <tr key={b.id}>
// //                 <td>{b.id}</td>
// //                 <td>{b.roomId}</td>
// //                 <td>{b.userName}</td>
// //                 <td>{new Date(b.startTime).toLocaleString()}</td>
// //                 <td>{new Date(b.endTime).toLocaleString()}</td>
// //                 <td>₹{b.totalPrice}</td>
// //                 <td>{b.status}</td>
// //                 <td>
// //                   {b.status === "CONFIRMED" && (
// //                     <button onClick={() => doCancel(b.id)}>Cancel</button>
// //                   )}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </section>

// //       <section style={{ marginTop: 20 }}>
// //         <h3>Analytics</h3>
// //         <label>
// //           From:{" "}
// //           <input
// //             type="date"
// //             value={from}
// //             onChange={(e) => setFrom(e.target.value)}
// //           />
// //         </label>
// //         <label>
// //           To:{" "}
// //           <input
// //             type="date"
// //             value={to}
// //             onChange={(e) => setTo(e.target.value)}
// //           />
// //         </label>
// //         <button onClick={fetchAnalytics}>Fetch</button>

// //         <div>
// //           <pre>{JSON.stringify(analytics, null, 2)}</pre>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// import React from "react";
// import { cancelBooking, getAnalytics } from "../api/api";

// interface Booking {
//   id: string;
//   roomId: string;
//   userName: string;
//   startTime: string;
//   endTime: string;
//   totalPrice: number;
//   status: string;
// }

// interface AnalyticsRow {
//   roomId: string;
//   roomName: string;
//   totalHours: number;
//   totalRevenue: number;
// }

// export default function AdminView() {
//   const [bookings, setBookings] = React.useState<Booking[]>([]);
//   const [from, setFrom] = React.useState("");
//   const [to, setTo] = React.useState("");
//   const [analytics, setAnalytics] = React.useState<AnalyticsRow[]>([]);

//   React.useEffect(() => {
//     fetch("/api/bookings")
//       .then((r) => r.json())
//       .then(setBookings);
//   }, []);

//   async function doCancel(id: string) {
//     const res = await cancelBooking(id);
//     alert(JSON.stringify(res));
//     fetch("/api/bookings")
//       .then((r) => r.json())
//       .then(setBookings);
//   }

//   async function fetchAnalytics() {
//     const rows = await getAnalytics(from, to);
//     setAnalytics(rows);
//   }

//   return (
//     <div className="p-6 max-w-6xl mx-auto font-sans">
//       <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

//       {/* BOOKINGS SECTION */}
//       <section className="bg-white shadow-md rounded-xl p-6 mb-8">
//         <h3 className="text-xl font-semibold mb-4">Bookings</h3>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-sm text-left">
//                 <th className="p-3">ID</th>
//                 <th className="p-3">Room</th>
//                 <th className="p-3">User</th>
//                 <th className="p-3">Start</th>
//                 <th className="p-3">End</th>
//                 <th className="p-3">Price</th>
//                 <th className="p-3">Status</th>
//                 <th className="p-3">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {bookings.map((b) => (
//                 <tr key={b.id} className="border-b hover:bg-gray-50">
//                   <td className="p-3">{b.id}</td>
//                   <td className="p-3">{b.roomId}</td>
//                   <td className="p-3">{b.userName}</td>
//                   <td className="p-3">
//                     {new Date(b.startTime).toLocaleString()}
//                   </td>
//                   <td className="p-3">
//                     {new Date(b.endTime).toLocaleString()}
//                   </td>
//                   <td className="p-3 font-medium">₹{b.totalPrice}</td>

//                   <td className="p-3">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold
//                         ${
//                           b.status === "CONFIRMED"
//                             ? "bg-green-100 text-green-600"
//                             : "bg-red-100 text-red-600"
//                         }
//                       `}
//                     >
//                       {b.status}
//                     </span>
//                   </td>

//                   <td className="p-3">
//                     {b.status === "CONFIRMED" && (
//                       <button
//                         onClick={() => doCancel(b.id)}
//                         className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
//                       >
//                         Cancel
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* ANALYTICS SECTION */}
//       <section className="bg-white shadow-md rounded-xl p-6">
//         <h3 className="text-xl font-semibold mb-4">Analytics</h3>

//         <div className="flex flex-wrap gap-4 mb-6">
//           <div className="flex flex-col">
//             <label className="text-sm">From</label>
//             <input
//               type="date"
//               value={from}
//               onChange={(e) => setFrom(e.target.value)}
//               className="border rounded-lg px-3 py-2 mt-1"
//             />
//           </div>

//           <div className="flex flex-col">
//             <label className="text-sm">To</label>
//             <input
//               type="date"
//               value={to}
//               onChange={(e) => setTo(e.target.value)}
//               className="border rounded-lg px-3 py-2 mt-1"
//             />
//           </div>

//           <button
//             onClick={fetchAnalytics}
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg h-[42px] mt-6 hover:bg-blue-700"
//           >
//             Fetch Analytics
//           </button>
//         </div>

//         {analytics.length > 0 ? (
//           <table className="min-w-full border-collapse">
//             <thead className="bg-gray-100 text-sm">
//               <tr>
//                 <th className="p-3 text-left">Room</th>
//                 <th className="p-3 text-left">Hours Booked</th>
//                 <th className="p-3 text-left">Revenue</th>
//               </tr>
//             </thead>
//             <tbody>
//               {analytics.map((row) => (
//                 <tr key={row.roomId} className="border-b hover:bg-gray-50">
//                   <td className="p-3">{row.roomName}</td>
//                   <td className="p-3">{row.totalHours}</td>
//                   <td className="p-3 font-medium">₹{row.totalRevenue}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="text-gray-500 text-sm mt-3 bg-pink">
//             No data. Select a date range.
//           </p>
//         )}
//       </section>
//     </div>
//   );
// }
import React from "react";
import { cancelBooking, getAnalytics, getBookings } from "../api/api";
import "../admin.css";
import dayjs from "dayjs";

interface Booking {
  id: string;
  roomId: string;
  userName: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
}

interface AnalyticsRow {
  roomId: string;
  roomName: string;
  totalHours: number;
  totalRevenue: number;
}

export default function AdminView() {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [analytics, setAnalytics] = React.useState<AnalyticsRow[]>([]);

  // React.useEffect(() => {
  //   fetch("/api/bookings")
  //     .then((r) => r.json())
  //     .then(setBookings);
  // }, []);

  React.useEffect(() => {
    async function load() {
      const data = await getBookings();
      setBookings(data);
    }
    load();
  }, []);

  async function doCancel(id: string) {
    const res = await cancelBooking(id);
    alert(JSON.stringify(res));
    fetch("/api/bookings")
      .then((r) => r.json())
      .then(setBookings);
  }

  // async function fetchAnalytics() {
  //   const rows = await getAnalytics(from, to);
  //   setAnalytics(rows);
  // }

  async function fetchAnalytics() {
    if (!from || !to) return;

    const fromIso = dayjs(from).startOf("day").toISOString();
    const toIso = dayjs(to).endOf("day").toISOString();

    const rows = await getAnalytics(fromIso, toIso);
    setAnalytics(rows);
  }
  return (
    <div className="admin-wrapper">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* BOOKINGS */}
      <section className="glass-card">
        <h3 className="section-title">Bookings</h3>

        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Room</th>
                <th>User</th>
                <th>Start</th>
                <th>End</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.roomId}</td>
                  <td>{b.userName}</td>
                  <td>{new Date(b.startTime).toLocaleString()}</td>
                  <td>{new Date(b.endTime).toLocaleString()}</td>
                  <td>₹{b.totalPrice}</td>
                  <td>
                    <span
                      className={
                        b.status === "CONFIRMED"
                          ? "badge badge-green"
                          : "badge badge-red"
                      }
                    >
                      {b.status}
                    </span>
                  </td>
                  <td>
                    {b.status === "CONFIRMED" && (
                      <button
                        className="btn-cancel"
                        onClick={() => doCancel(b.id)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="glass-card">
        <h3 className="section-title">Analytics</h3>

        <div className="filters">
          <div className="filter-item">
            <label>From</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>To</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <button className="btn-primary" onClick={fetchAnalytics}>
            Fetch Analytics
          </button>
        </div>

        {analytics.length > 0 ? (
          <div className="table-wrapper">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Total Hours</th>
                  <th>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {analytics.map((row) => (
                  <tr key={row.roomId}>
                    <td>{row.roomName}</td>
                    <td>{row.totalHours}</td>
                    <td>₹{row.totalRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-text">No analytics data.</p>
        )}
      </section>
    </div>
  );
}
