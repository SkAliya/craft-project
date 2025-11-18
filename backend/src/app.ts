import express from "express";
import cors from "cors";
import roomsRouter from "./routes/rooms";
import bookingsRouter from "./routes/bookings";
import analyticsRouter from "./routes/analytics";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/rooms", roomsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/analytics", analyticsRouter);

app.get("/", (req, res) => res.send({ ok: true }));

export default app;
