import express from "express";
import {
  renderLoginPage,
  loginUser,
  logoutUser,
} from "../controllers/adminController";

const router = express.Router();

router.get("/loginPage", renderLoginPage);

router.post("/login", loginUser);

router.delete("/logut", logoutUser);

export default router;
