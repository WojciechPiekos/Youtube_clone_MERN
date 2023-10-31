import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  subscribeUser,
  unsubscribeUser,
  likeVideo,
  dislikeVideo,
} from "../controllers/userController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

// update user
router.put("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

// get a user
router.get("/find/:id", getUser);

// subscribe a user
router.put("/sub/:id", verifyToken, subscribeUser);

// unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribeUser);

// like a video
router.put("/like/:videoId", verifyToken, likeVideo);

// dislike a video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
