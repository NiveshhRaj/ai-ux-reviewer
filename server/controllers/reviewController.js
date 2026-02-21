import Review from "../models/Review.js";
import { scrapeWebsite } from "../utils/scraper.js";
import { generateUXReview } from "../utils/llm.js";

export const createReview = async (req, res) => {
  try {
    const { url } = req.body;

    console.log("Incoming URL:", url);

    if (!url) {
      return res.status(400).json({ message: "URL required" });
    }

    const content = await scrapeWebsite(url);
    console.log("Scraped content:", content.title);

    const aiResult = await generateUXReview(content);
    console.log("AI Result:", aiResult);

    const review = await Review.create({
      url,
      score: aiResult.score,
      issues: aiResult.issues,
      suggestions: aiResult.suggestions
    });

    res.json(review);

  } catch (err) {
  console.error("FULL ERROR:", err.message);

  res.status(500).json({
    message: err.message || "Error generating review",
  });
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

