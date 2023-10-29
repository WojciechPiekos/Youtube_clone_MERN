import express, { json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./config/dbCon.js";
import corsOptions from "./config/corsOptions.js";
import usersRoutes from "./routes/users.js";
import videosRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import { logger, logEvents } from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
dotenv.config();

const __dirname = path.resolve();

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/users", usersRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/comments", commentRoutes);

mongoose.connection.on("open", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log(error);
  logEvents(
    `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
    "mongoErrLog.log"
  );
});

app.use(errorHandler);
