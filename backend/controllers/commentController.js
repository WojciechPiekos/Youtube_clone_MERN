import Comment from "../models/Comment.js"
import Video from "../models/Video.js"
import customError from "../utils/customError.js"



const addComment = async (req,res,next) => {
    const newComment = new Comment({...req.body, userId: req.user.id})
    try {
        const savedComment = await newComment.save()
        res.status(200).json(savedComment)
    } catch (error) {
        next(customError(error.code,error.message,req,res))
    }
}

const deleteComment = async (req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const video = await Video.findById(req.params.id)

        if (req.user.id === comment.userId || req.user.id === video.userId) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json({ message:  "The comment has been deleted"})
        } else {
            return next(customError(403,"You can delete only your comment!"))
        }
    } catch (error) {
        next(customError(error.code,error.message,req,res))
    }
}

const getComments = async (req,res,next) => {
    try {
        const comments = await Comment.find({ videoId: req.params.videoId })
        res.status(200).json(comments)
    } catch (error) {
        next(customError(error.code,error.message,req,res))
    }
}


export {
    addComment,
    deleteComment,
    getComments,
}