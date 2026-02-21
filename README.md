# AI UX Reviewer

AI-powered website UX auditing tool built with the MERN stack.

Live Application:  
https://your-vercel-url.vercel.app

Backend API:  
https://your-render-url.onrender.com

---

## 🚀 Overview

AI UX Reviewer allows users to:

- Paste a website URL
- Automatically scrape key semantic content
- Generate an AI-based UX review
- View categorized UX issues
- See before/after improvement suggestions
- Export a structured PDF report
- Store and retrieve recent reviews

This project demonstrates full-stack architecture, LLM integration, prompt engineering, and production deployment.

---

## 🧠 How It Works

1. User submits a URL from frontend.
2. Backend scrapes structured content (title, headings, buttons, forms, main text).
3. Scraped content is sent to an LLM with a structured UX evaluation prompt.
4. The model returns categorized UX issues, explanations, proof references, and suggestions.
5. Results are stored in MongoDB and displayed on the dashboard.
6. Users can export a professional PDF report.

---

## 🏗 Architecture

React (Frontend)
↓
Express API (Backend)
↓
Scraper (Axios + Cheerio)
↓
LLM (Gemini / OpenAI)
↓
Structured JSON Response
↓
MongoDB (Stores Last 5 Reviews)
↓
Dashboard UI + PDF Export

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios

Backend:
- Node.js
- Express
- MongoDB + Mongoose
- Cheerio (HTML parsing)

AI:
- Gemini / OpenAI API
- Prompt-engineered structured output

Deployment:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 📦 Local Setup

### Backend

cd server
npm install
npm start


### Create `.env`:

PORT=5000
MONGO_URI=your_mongo_uri
GEMINI_API_KEY=your_key


### Frontend

cd client
npm install
npm run dev

### Create `.env`:

VITE_API_URL=http://localhost:5000


---

## ⚠️ Known Limitations

- Some websites block automated scraping (Cloudflare / bot protection).
- Does not render JavaScript-heavy SPAs.
- Heuristic-based review (content + structure), not pixel-level visual analysis.
- Free-tier hosting may introduce cold-start delays.

---

## 🔮 Future Improvements

- Headless browser support (Puppeteer)
- Screenshot-based proof extraction
- Rate limiting & caching
- Compare two URLs
- Analytics dashboard
- Severity scoring system

---

## 📄 License

This project was built as part of a technical assessment.




