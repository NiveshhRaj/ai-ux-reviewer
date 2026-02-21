# Prompts Used

## Primary UX Analysis Prompt

Analyze this website content and generate:

- 8–12 UX issues grouped by category:
  (clarity, layout, navigation, accessibility, trust)
- Short explanation for each issue
- Exact proof text reference
- 3 before/after improvement suggestions
- Overall UX score (0–100)

Return strictly in JSON format:

{
  "score": number,
  "issues": [
    {
      "category": "",
      "title": "",
      "reason": "",
      "proof": ""
    }
  ],
  "suggestions": [
    {
      "before": "",
      "after": ""
    }
  ]
}

Website Content:
{structured content JSON}

---

## Debugging Prompt

Fix JSON formatting errors and ensure strict JSON compliance without extra text.

---

## UI Improvement Prompt

Improve dashboard layout for premium SaaS feel without changing logic.
