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

const router = express.Router();

// update user
router.put("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// get a user
router.get("/find/:id", getUser);

// subscribe a user
router.put("/sub/:id", subscribeUser)

// unsubscribe a user
router.put("/unsub/:id", unsubscribeUser)

// like a video
router.put("/like/:videoId", likeVideo)

// dislike a video
router.put("/dislike/:videoId", dislikeVideo)

export default router;
