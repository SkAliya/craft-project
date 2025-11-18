import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import { seedDefaultRooms } from "./seed";

const PORT = process.env.PORT || 4000;
seedDefaultRooms();

app.listen(PORT, () => {
  console.log(`Workspace API running on port ${PORT}`);
});
