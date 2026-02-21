import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "./logger.js";

/**
 * Safely extract JSON from model output
 */
function extractJSON(text) {
  try {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON detected in LLM response");
    }

    const cleaned = text.substring(jsonStart, jsonEnd + 1);
    return JSON.parse(cleaned);
  } catch (err) {
    logger.error("JSON parsing failed", { error: err.message });
    throw new Error("Invalid JSON returned by LLM");
  }
}

async function callModel(content) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a senior UX auditor.

Analyze the website content below and generate:

- 8-12 UX issues grouped by category (clarity, layout, navigation, accessibility, trust)
- short explanation
- exact proof text reference
- 3 before/after suggestions
- overall UX score (0-100)

Return ONLY valid JSON in this format:

{
  "score": number,
  "issues": [
    { "category": "", "title": "", "reason": "", "proof": "" }
  ],
  "suggestions": [
    { "before": "", "after": "" }
  ]
}

Website Content:
${JSON.stringify(content)}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  logger.info("LLM response received");

  return extractJSON(text);
}

export async function generateUXReview(content, retries = 2) {
  try {
    logger.info("Calling LLM for UX review");

    return await callModel(content);

  } catch (error) {
    logger.error("LLM call failed", {
      error: error.message,
      retriesLeft: retries,
    });

    if (retries > 0) {
      logger.info("Retrying LLM call");
      return generateUXReview(content, retries - 1);
    }

    throw new Error("Failed to generate UX review after retries");
  }
}