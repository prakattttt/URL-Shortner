import AppError from "../utils/appError.js";
import urlModule from "../modules/urlModule.js";

export const renderLandingPage = async (req, res, next) => {
  try {
    res.render("index", { shortUrl: null });
  } catch (err) {
    next(new AppError("Unable to fetch url!", 400));
  }
};

export const generateShortUrl = async (req, res, next) => {
  try {
    const { fullUrl } = req.body;
    if (!fullUrl) return next(new AppError("URL required", 400));
    const existing = await urlModule.findOne({ fullUrl: fullUrl });
    let shortCode;

    if (existing) {
      shortCode = existing.shortUrl;
    } else {
      const newDoc = await urlModule.create({ fullUrl: fullUrl });
      shortCode = newDoc.shortUrl;
    }
    res.redirect(`/url/result/${shortCode}`);
  } catch (err) {
    next(new AppError("Unable to shorten URL", 500));
  }
};

export const getShortUrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const doc = await urlModule.findOne({ shortUrl: code });
    if (!doc) return next(new AppError("Not found", 404));
    const shortUrl = `${req.protocol}://${req.get("host")}/url/${code}`;
    res.render("index", { shortUrl });
  } catch (err) {
    next(new AppError("Server error", 500));
  }
};

export const redirectUrl = async (req, res, next) => {
  try {
    const url = await urlModule.findOne({ shortUrl: req.params.shortenUrl });
    if (!url) return next(new AppError("Url not found!", 404));
    url.visit++;
    await url.save();
    res.redirect(url.fullUrl);
  } catch (err) {
    next(new AppError("Unable to fulfill the request!", 400));
  }
};

export const getDatabase = async (req, res, next) => {
  try {
    const urls = await urlModule.find();
    res.render("database", { urls });
  } catch (err) {
    next(new AppError("Unable to fetch database", 400));
  }
};
