import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import messageRoutes from "../src/routes/message.route.js"


dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000;  

app.use(express.json()) // body parser to decode json value from body requests
app.use(cookieParser()) // cookie parser to decode values from the jwt cookie for validation

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  connectDB()
});
