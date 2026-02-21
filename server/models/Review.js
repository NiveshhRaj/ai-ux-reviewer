import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  category: String,
  title: String,
  reason: String,
  proof: String
});

const suggestionSchema = new mongoose.Schema({
  before: String,
  after: String
});

const reviewSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  score: Number,
  issues: Array,
  suggestions: Array,
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
  },
}, { timestamps: true });

// Auto-delete after expiry
reviewSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Review", reviewSchema);
