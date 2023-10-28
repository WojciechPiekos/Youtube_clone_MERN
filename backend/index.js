import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

import connectDB from "./config/dbCon.js"
import usersRoutes from "./routes/users.js"
import videosRoutes from "./routes/videos.js"
import commentRoutes from "./routes/comments.js"

const app = express()
dotenv.config()
connectDB()

app.use("/api/users", usersRoutes)
app.use("/api/videos", videosRoutes)
app.use("/api/comments", commentRoutes)

mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})

mongoose.connection.on("error", (error) => {
    console.log(error)
})

