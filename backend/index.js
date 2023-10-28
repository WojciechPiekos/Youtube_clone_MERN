import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"

import connectDB from "./config/dbCon.js"

const app = express()
dotenv.config()
connectDB()


mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })
})

mongoose.connection.on("error", (error) => {
    console.log(error)
})

