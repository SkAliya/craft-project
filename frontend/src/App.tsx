import React from "react";
import RoomsPage from "./pages/RoomsPage";
import BookingForm from "./pages/BookingForm";
import AdminView from "./pages/AdminView";
import "./nav.css";

export default function App() {
  const [view, setView] = React.useState<"rooms" | "book" | "admin">("rooms");

  //   <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
  //     <header style={{ marginBottom: 20 }}>
  //       <button onClick={() => setView("rooms")}>Rooms</button>{" "}
  //       <button onClick={() => setView("book")}>Book</button>{" "}
  //       <button onClick={() => setView("admin")}>Admin</button>
  //     </header>
  //     <main>
  //       {view === "rooms" && <RoomsPage />}
  //       {view === "book" && <BookingForm />}
  //       {view === "admin" && <AdminView />}
  //     </main>
  //   </div>
  // );
  return (
    <div className="app-wrapper">
      <header className="nav-bar">
        <button
          className={`nav-btn ${view === "rooms" ? "active" : ""}`}
          onClick={() => setView("rooms")}
        >
          Rooms
        </button>

        <button
          className={`nav-btn ${view === "book" ? "active" : ""}`}
          onClick={() => setView("book")}
        >
          Book
        </button>

        <button
          className={`nav-btn ${view === "admin" ? "active" : ""}`}
          onClick={() => setView("admin")}
        >
          Admin
        </button>
      </header>

      <main className="main-content">
        {view === "rooms" && <RoomsPage />}
        {view === "book" && <BookingForm />}
        {view === "admin" && <AdminView />}
      </main>
    </div>
  );
}
