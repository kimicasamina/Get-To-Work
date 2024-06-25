import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import projectRoute from "./routes/project-route.js";
import taskRoute from "./routes/task-route.js";
import timeRoute from "./routes/time-route.js";
import userRoute from "./routes/user-route.js";
import authRoute from "./routes/auth-route.js";

const app = express();
dotenv.config();
connectDB();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/projects", projectRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/time", timeRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
// app.use(ErrorHandler);
// app.use(ErrorHandler);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => res.send("Server is ready..."));
}

app.listen(process.env.PORT || 4000, () => {
  console.log("SERVER STARTS AT:", process.env.PORT);
  console.log("NODE_ENV:", process.env.NODE_ENV);
});
