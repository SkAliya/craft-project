import { Router } from "express";
import { createBooking, cancelBooking } from "../controllers/bookingController";
import { BookingService } from "../services/bookingService";
const router = Router();

router.get("/", (req, res) => {
  const all = BookingService.list();
  return res.json(all);
});
router.post("/", createBooking);
router.patch("/:id/cancel", cancelBooking);
export default router;
