import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";
import rateLimit from "express-rate-limit";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: ["http://localhost:5173"], // frontend URL
  credentials: true
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});
app.use("/api", limiter);

// Routes
app.use("/api/reviews", reviewRoutes);

// Health endpoint
app.get("/api/health", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({
      backend: "OK",
      database: "Connected",
      llm: "Configured"
    });
  } catch (err) {
    logger.error("Health check failed", { error: err.message });
    res.status(500).json({ status: "Error" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error("Unhandled error", { error: err.message });
  res.status(500).json({ message: "Internal Server Error" });
});

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    logger.info("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      logger.info(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch(err => logger.error("MongoDB connection failed", { error: err.message }));

export default app;