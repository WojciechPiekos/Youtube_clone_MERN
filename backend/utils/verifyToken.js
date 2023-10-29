import jwt from "jsonwebtoken";
import customError from "./customError.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(customError(401, "You are not authenticated", req, res));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(customError(403, "Token is not valid", req, res));
    }
    req.user = user;
    next();
  });
};

export default verifyToken
