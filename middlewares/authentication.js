import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return next(new AppError("User not authenticated! Please login.", 401));
  jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN, (err, payload) => {
    if (err) {
      return next(new AppError("Session Expired! Please login again!", 403));
    }
    next();
  });
};
