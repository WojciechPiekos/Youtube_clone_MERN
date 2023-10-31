import User from "../models/User.js"
import customError from "../utils/customError.js"



// update user
const updateUser = async (req,res,next) => { 
    if (req.params.id === req.user.id) {
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
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: "User has been deleted" })
        } catch (error) {
            next(customError(error.code,error.message,req,res)) 
        }
    } else {
        next(customError(403,"You can delete only your account!",req,res))
    }
}

// get a user
const getUser = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            next(customError(404,"User not found",req,res))
        }
        res.status(200).json(user)
    } catch (error) {
        next(customError(error.code,error.message,req,res))
    }
}

// subscribe a user
const subscribeUser = async (req,res,next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push:{subscribedUsers:req.params.id},
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc:{subscribers:1},
        })
        res.status(200).json({ message: "Subscription successfull" })
    } catch (error) {
        next(customError(error.code,error.message,req,res))
    }
}

// unsubscribe a user
const unsubscribeUser = async (req,res,next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull:{subscribedUsers:req.params.id},
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc:{subscribers:-1},
        })
        res.status(200).json({ message: "Unsubscription successfull" })
    } catch (error) {
        next(customError(error.code,error.message,req,res))
    }
}

// like a video
const likeVideo = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(customError(error.code,error.message,req,res))
    }
}

// dislike a video
const dislikeVideo = async (req,res,next) => {
    try {
        
    } catch (error) {
        next(customError(error.code,error.message,req,res))
    }
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