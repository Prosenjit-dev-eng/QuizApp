import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resultRouter from "./routes/resultRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Allowed origins
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

if (!allowedOrigins.includes("http://localhost:5173")) {
  allowedOrigins.push("http://localhost:5173");
}
if (!allowedOrigins.includes("http://localhost:4173")) {
  allowedOrigins.push("http://localhost:4173");
}

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Dynamically allow any origin to prevent CORS errors in deployment
      callback(null, true);
    },
    credentials: true, // Crucial for cookies/auth headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
connectDB();

// Routes
app.use("/api/auth", userRouter);
app.use("/api/results", resultRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});