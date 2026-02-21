import express from "express";
import mongoose from "mongoose";
import OpenAI from "openai";

const router = express.Router();

router.get("/", async (req, res) => {
  let dbStatus = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";

  let llmStatus = "Unknown";
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    await openai.models.list();
    llmStatus = "Working";
  } catch {
    llmStatus = "Error";
  }

  res.json({
    server: "OK",
    database: dbStatus,
    llm: llmStatus
  });
});

export default router;
