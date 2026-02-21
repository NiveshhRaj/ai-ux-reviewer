import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import reviewRoutes from "./routes/reviewRoutes.js";
import statusRoutes from "./routes/statusRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/reviews", reviewRoutes);
app.use("/api/status", statusRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

console.log("Loaded Gemini Key:", process.env.GEMINI_API_KEY);
app.listen(5000, () => console.log("Server running on port 5000"));


