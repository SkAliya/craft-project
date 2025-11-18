// const API_BASE = import.meta.env.VITE_API_BASE || "";

const API_BASE = "http://localhost:3000/api";
export async function getRooms() {
  const res = await fetch(`${API_BASE}/rooms`);
  return res.json();
}

export async function getBookings() {
  const res = await fetch(`${API_BASE}/bookings`);
  return res.json();
}
// export async function createBooking(payload: unknown) {
//   const res = await fetch(`${API_BASE}/api/bookings`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   return res.json().then((d) => ({ status: res.status, data: d }));
// }
export async function createBooking(payload: unknown) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Booking failed");
  }

  return res.json(); // ✅ return backend response only
}

export async function listBookings() {
  const res = await fetch(`${API_BASE}/bookings`);
  return res.json();
}

export async function cancelBooking(id: string) {
  const res = await fetch(`${API_BASE}/bookings/${id}/cancel`, {
    method: "PATCH",
  });
  return res.json().then((d) => ({ status: res.status, data: d }));
}

// export async function getAnalytics(from: string, to: string) {
//   const res = await fetch(`${API_BASE}/analytics?from=${from}&to=${to}`);
//   return res.json();
// }

export async function getAnalytics(fromIso: string, toIso: string) {
  const res = await fetch(
    `${API_BASE}/analytics?from=${encodeURIComponent(
      fromIso
    )}&to=${encodeURIComponent(toIso)}`
  );
  return res.json();
}
