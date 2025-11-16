import express from "express";
import AppError from "../utils/appError.js";

const router = express.Router();

router.get("/", (req, res, next) => {
    res.render("index");
});

export default router;