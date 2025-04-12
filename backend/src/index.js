import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "../src/routes/message.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // body parser to decode json value from body requests
app.use(cookieParser()); // cookie parser to decode values from the jwt cookie for validation
// cors allows frontend to interact with backend api
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //allows cookies to be sent
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB();
});
