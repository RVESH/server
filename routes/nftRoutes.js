import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
  mintNFT,
  getAllNFTs,
  updateOwner,
  transferNFT,
} from "../controllers/nftController.js";

const router = express.Router();

// ✅ Apply auth to all routes
router.use(authMiddleware);

// ✅ Validate NFT data middleware
const validateNFTData = (req, res, next) => {
  const { title, description, image, price, owner } = req.body;
  if (!title || !description || !image || !price || !owner) {
    return res.status(400).json({ success: false, message: "Missing NFT fields" });
  }
  next();
};

// ✅ Routes
router.post("/create", validateNFTData, mintNFT);
router.get("/explore", getAllNFTs);
router.put("/update-owner/:id", updateOwner);
router.post("/transfer", transferNFT);

export default router;
