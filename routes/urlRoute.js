import express from "express";

const router = express.Router();

router.get("/", controlUrl);
router.post("/", controlUrl);

export default router;