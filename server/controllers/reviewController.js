import Review from "../models/Review.js";
import { logger } from "../utils/logger.js";
import { scrapeWebsite } from "../utils/scraper.js";
import { generateUXReview } from "../utils/llm.js";

export const createReview = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    logger.info("Incoming review request", { url });

    // Caching
    const existing = await Review.findOne({ url });
    if (existing) {
      logger.info("Returning cached review", { url });
      return res.json(existing);
    }

    const content = await scrapeWebsite(url);
    const review = await generateUXReview(content);

    const saved = await Review.create({
      url,
      score: review.score,
      issues: review.issues,
      suggestions: review.suggestions
    });

    logger.info("Review generated successfully", { url });

    res.json(saved);

  } catch (err) {
    logger.error("Review generation failed", { error: err.message });
    res.status(500).json({ message: err.message });
  }
};


export const getLastFive = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(reviews);
  } catch (err) {
    console.error("GET LAST FIVE ERROR:", err);
    res.status(500).json({ message: "Error fetching reviews" });
  }
};

