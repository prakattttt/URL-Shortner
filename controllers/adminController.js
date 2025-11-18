import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

export const renderLoginPage = (re, res, next) => {
  try {
    res.render("login");
  } catch (err) {
    next(new AppError(err.message, err.status || 500));
  }
};

export const loginUser = (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code)
      return next(new AppError("Please enter the admin code to cotinue!", 400));
    if (code !== process.env.ADMIN_CODE)
      return next(new AppError("Invalid Code!", 401));
    const token = jwt.sign({ code }, process.env.ADMIN_ACCESS_TOKEN, {
      expiresIn: "30m",
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
    });
    res.render("database");
  } catch (err) {
    next(new AppError(err.message, err.status || 500));
  }
};

export const logoutUser = (req, res, next) => {
  try {
    res.cookie("jwt", null, {
      httpOnly: true,
      maxAge: 0,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully!" });
  } catch (err) {
    next(new AppError(err.message, err.status || 500));
  }
};
