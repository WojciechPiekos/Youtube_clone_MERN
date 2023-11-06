import express from "express";
import { signin,signup,google,signout } from "../controllers/authController.js";

const router = express.Router();

// Create a user
router.post("/signup", signup)

// Sign in
router.post("/signin", signin)

// Google auth
router.post("/google", google)

// Signout
router.post("/signout", signout)

export default router;
