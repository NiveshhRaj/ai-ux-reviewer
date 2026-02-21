import express from "express";
import { createReview, getLastFive } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
router.get("/recent", getLastFive);

export default router;
