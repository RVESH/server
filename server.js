import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";


import authRoutes from "./routes/authRoutes.js";
import nftRoutes from "./routes/nftRoutes.js";
import protect from "./middlewares/authMiddleware.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/api/nft", protect, nftRoutes);
app.use("/api/auth", authRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Error Handler
app.use(errorHandler);

// ✅ Connect DB, Then Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

startServer();
