import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

export const authenticateUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token)
    return;
  jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN, (err, payload) => {
    if (err) {
      return;
    }
    next();
  });
};
