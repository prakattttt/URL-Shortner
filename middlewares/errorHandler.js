import AppError from "../utils/appError";

export const errorHandler = (req, res, err, next) => {
    res.status(err.status || 500).json({message: err.message || "Internal Server Error!"});
}

export const defaultError = (req, res, next) => {
    next(new AppError("Page not found!", 404));
}