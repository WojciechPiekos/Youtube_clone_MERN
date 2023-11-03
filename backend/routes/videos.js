import express from "express";
import verifyToken from "../utils/verifyToken.js";
import {
  createVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  viewVideo,
  trendVideo,
  randomVideo,
  subscribeVideo,
  getByTag,
  search,
} from "../controllers/videoController.js";


const router = express.Router();

// create a vdeo
router.post("/", verifyToken, createVideo);

// update a video
router.put("/:id", verifyToken, updateVideo);

// delete a video
router.delete("/:id", verifyToken, deleteVideo);

// get a video
router.get("/find/:id", getVideo);

// video views
router.put("/view/:id", viewVideo)

// trend Video
router.get("/trend", trendVideo)

// get random video
router.get("/random", randomVideo)

// subscribe video
router.get("/sub", verifyToken, subscribeVideo)

// get video by tags
router.get("/tags", getByTag)

// search video
router.get("/search", search)

export default router;
