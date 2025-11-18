import express from "express";
import { authenticateUser } from "../middlewares/authentication.js";
import {
  renderLandingPage,
  getDatabase,
  generateShortUrl,
  getShortUrl,
  redirectUrl,
} from "../controllers/urlControlller.js";

const router = express.Router();

router.get("/", renderLandingPage);

router.get("/admin/database", authenticateUser, getDatabase);

router.post("/shortenUrl", generateShortUrl);

router.get("/result/:code", getShortUrl);

router.get("/:shortenUrl", redirectUrl);

export default router;
