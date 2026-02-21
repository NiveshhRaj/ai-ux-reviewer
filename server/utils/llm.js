import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateUXReview = async (content) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Gemini API key not found in environment variables");
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

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const cleaned = text.substring(jsonStart, jsonEnd + 1);

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("LLM Error:", error.message);
    throw new Error("Failed to generate UX review");
  }
};
