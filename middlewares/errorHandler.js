import AppError from "../utils/appError.js";

export const errorHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error!" });
};

export const defaultError = (req, res, next) => {
  next(new AppError("Page not found!", 404));
};
