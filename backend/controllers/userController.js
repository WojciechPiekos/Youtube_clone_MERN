import User from "../models/User.js"
import customError from "../utils/customError.js"



// update user
const updateUser = async (req,res,next) => {
    if (req.params.id !== req.user._id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set:req.body
            },{new: true})
            res.status(200).json(updatedUser)
        } catch (error) {
            next(customError(error.code,error.message,req,res)) 
        }
    } else {
        next(customError(403,"You can update only your account!",req,res))
    }
}

// delete user
const deleteUser = async (req,res,next) => {

}

// get a user
const getUser = async (req,res,next) => {

}

// subscribe a user
const subscribeUser = async (req,res,next) => {

}

// unsubscribe a user
const unsubscribeUser = async (req,res,next) => {

}

// like a video
const likeVideo = async (req,res,next) => {

}

// dislike a video
const dislikeVideo = async (req,res,next) => {

}

export {
    updateUser,
    deleteUser,
    getUser,
    subscribeUser,
    unsubscribeUser,
    likeVideo,
    dislikeVideo,
}