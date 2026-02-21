# AI Notes

## LLM Used

This project uses Gemini / OpenAI API for structured UX analysis.

The model was chosen based on:
- Cost efficiency
- Structured output capability
- Fast response time
- Good reasoning on content and structure

---

## What AI Was Used For

AI assisted in:
- Prompt engineering refinement
- Structuring JSON response format
- Debugging integration errors
- Generating UX heuristic categories
- Improving UI structure ideas

---

## What Was Manually Verified

- Backend route handling
- Scraper content extraction logic
- MongoDB storage logic
- Error handling
- Production deployment
- Environment configuration
- PDF report generation logic

All logic and architectural decisions were reviewed and understood before submission.

---

## Prompt Engineering Strategy

The prompt enforces:

- Strict JSON output
- Categorized UX issues
- Proof references
- Score (0-100)
- Before/After suggestions

This reduces hallucination and ensures structured responses.

---

## Limitations of LLM Review

- Does not visually render pages
- Relies on semantic structure only
- Accuracy depends on scraped content quality
- Can miss design/layout nuances

---

## Production Improvements

For production:
- Add validation layer for JSON schema
- Add fallback model handling
- Add retry mechanism
- Implement caching
- Use headless browser for better scraping
