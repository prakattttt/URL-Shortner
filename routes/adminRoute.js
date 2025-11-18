import express from "express";
import {
  renderLoginPage,
  loginUser,
  logoutUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/loginPage", renderLoginPage);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

export default router;
