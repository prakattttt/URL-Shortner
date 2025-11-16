import express from "express";
import AppError from "../utils/appError.js";
import urlModule from "../modules/urlModule.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const urls = await urlModule.find();
    res.render("index", { urls });
  } catch (err) {
    next(new AppError("Unable to fetch url!", 400));
  }
});

router.post("/shortenUrl", async (req, res, next) => {
  try {
    const { fullUrl } = req.body;
    if (!fullUrl) return next(new AppError("Please enter a url!", 400));
    const url = await urlModule.create({ fullUrl });
    res.render("index", { shortUrl: url.shortUrl });
  } catch (err) {
    next(new AppError("Unable to fulfill the request!", 400));
  }
});

router.get("/:shortenUrl", async (req, res, next) => {
  try {
    const url = await urlModule.findOne({ shortUrl: req.params.shortenUrl });
    if (!url) return next(new AppError("Url not found!", 404));
    url.clicks++;
    await url.save();
    res.redirect(url.fullUrl);
  } catch (err) {
    next(new AppError("Unable to fulfill the request!", 400));
  }
});

export default router;
