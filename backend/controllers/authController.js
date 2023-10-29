import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import customError from "../utils/customError.js";
import User from "../models/User.js";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      next(
        customError(
          400,
          "All fileds are nessesary (name, password, email)",
          req,
          res
        )
      );
      return;
    }
    const userName = await User.findOne({ name }).exec();
    const userEmail = await User.findOne({ email }).exec();
    if (userName || userEmail) {
      next(customError(409, "Name or Email are not uniqe)", req, res));
      return;
    }

    const hashedPwd = bcryptjs.hashSync(password, 10);
    const newUserObj = { name, email, password: hashedPwd };

    const newUser = new User(newUserObj);
    await newUser.save();

    res.status(201).json({ message: "New user has been created" });
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

export const signin = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      next(
        customError(
          400,
          "All fileds are nessesary (name, password, email)",
          req,
          res
        )
      );
      return;
    }
    const user = await User.findOne({ name }).exec();
    if (!user) {
      next(customError(404, "User not found!", req, res));
      return;
    }
    const unHashedPwd = bcryptjs.compareSync(password, user.password);
    if (!unHashedPwd) {
      next(customError(400, "Wrong credentials!", req, res));
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password:pass, ...rest } = user._doc
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(customError(error.code, error.message, req, res));
  }
};

export const google = (req, res, next) => {};
