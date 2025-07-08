// /server.js
import dotenv from "dotenv";
dotenv.config(); // ✅ Load env vars at the very TOP (Best Practice)

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import nftRoutes from "./routes/nftRoutes.js"; // ✅ NFT Routes

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ API Routes
app.use("/api/nft", nftRoutes);

// ✅ MongoDB Connection (Highly Recommended to Use try-catch)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop app if DB fails
  }
};

connectDB();

// ✅ Start Server (Only after DB Connects)
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
