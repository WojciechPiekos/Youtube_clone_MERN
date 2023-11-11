import User from "../models/User.js";
import Video from "../models/Video.js";
import customError from "../utils/customError.js";

const createVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(customError(404, "Video not found", req, res));
    }
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateVideo);
    } else {
      return next(customError(401, "You can only update your video", req, res));
    }
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(customError(404, "Video not found", req, res));
    }
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The video has been deleted" });
    } else {
      return next(
        customError(401, "You can only delete only your video", req, res)
      );
    }
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      next(customError(404, "Video not found!", req, res));
    }
    res.status(200).json(video);
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

const viewVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { videoViws: 1 },
    });
    res.status(200).json({ message: "The view has been increased" });
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

const trendVideo = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ viewVideo: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

const randomVideo = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

const subscribeVideo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

const search = async (req, res, next) => {
  const query = req.query.query;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

export {
  createVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  randomVideo,
  trendVideo,
  viewVideo,
  subscribeVideo,
  getByTag,
  search,
};
