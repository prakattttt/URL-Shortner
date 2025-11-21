import urlModule from "../modules/urlModule.js";

export const renderLandingPage = async (req, res) => {
  try {
    res.render("index", { shortUrl: null });
  } catch (err) {
    res.render("error", { errors: err.message || "something went wrong!" });
  }
};

export const generateShortUrl = async (req, res) => {
  try {
    const { fullUrl } = req.body;
    if (!fullUrl) {
      req.flash("errors", "Please enter a URL!");
      return res.redirect("/url/");
    }

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
    res.render("error", { errors: err.message || "something went wrong!" });
  }
};

export const getShortUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const doc = await urlModule.findOne({ shortUrl: code });
    if (!doc) {
      req.flash("errors", "URL not found!");
      return res.redirect("/url/");
    }

    const shortUrl = `${req.protocol}://${req.get("host")}/url/${code}`;
    res.render("index", { shortUrl });
  } catch (err) {
    res.render("error", { errors: err.message || "something went wrong!" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const url = await urlModule.findOne({ shortUrl: req.params.shortenUrl });
    if (!url) {
      req.flash("errors", "URL not found!");
      return res.redirect("/url/");
    }
    url.visit++;
    await url.save();
    res.redirect(url.fullUrl);
  } catch (err) {
    res.render("error", { errors: err.message || "something went wrong!" });
  }
};

export const getDatabase = async (req, res) => {
  try {
    let urls = await urlModule.find();
    if (!urls) {
      req.flash("errors", "No entries in the database!");
      res.redirect("/url/admin/database");
    }

    urls = urls.map((url) => {
      return {
        ...url.toObject(),
        fullShortUrl: `${req.protocol}://${req.get("host")}/url/${
          url.shortUrl
        }`,
      };
    });

    res.render("database", { urls });
  } catch (err) {
    res.render("error", { errors: err.message || "something went wrong!" });
  }
};
