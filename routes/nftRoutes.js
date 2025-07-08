import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

// ✅ Apply to all routes below:
router.use(authMiddleware);

import {
  createNFT,
  getAllNFTs,
  updateOwner, // ✅ import added
  transferNFT,  // ✅ Blockchain transfer added

} from "../controllers/nftController.js";

const router = express.Router();


// ✅ Validate NFT data middleware (optional for advanced safety)
const validateNFTData = (req, res, next) => {
  const { title, description, image, price, owner } = req.body;
  if (!title || !description || !image || !price || !owner) {
    return res.status(400).json({ success: false, message: "Missing NFT fields" });
  }
  next();
};

// @route   POST /api/nft/create
// @desc    Create a new NFT
router.post("/create", createNFT, validateNFTData);

// @route   GET /api/nft/explore
// @desc    Get all NFTs for explore page
// ✅ Explore NFTs
router.get("/explore", getAllNFTs);

// @route   PUT /api/nft/update-owner/:id
// @desc    Update NFT owner after purchase
router.put("/update-owner/:id", updateOwner); // ✅ added

// ✅ Transfer NFT on Blockchain (Secure Route Example)
router.post("/transfer", transferNFT);

export default router;
