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
  url: String,
  score: Number,
  issues: [issueSchema],
  suggestions: [suggestionSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Review", reviewSchema);
