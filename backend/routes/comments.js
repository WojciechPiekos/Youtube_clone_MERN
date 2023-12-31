import express from "express";
import { addComment, deleteComment, getComments } from "../controllers/commentController.js";
import verifyToken from "../utils/verifyToken.js"

const router = express.Router()

// add comment
router.post("/", verifyToken, addComment)

// delete comment
router.delete("/:id", verifyToken, deleteComment)

// get comment
router.get("/:videoId", getComments)


export default router