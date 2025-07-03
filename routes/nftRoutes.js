import express from "express";
import {
  createNFT,
  getAllNFTs,
  updateOwner, // ✅ import added
} from "../controllers/nftController.js";

const router = express.Router();

// @route   POST /api/nft/create
// @desc    Create a new NFT
router.post("/create", createNFT);

// @route   GET /api/nft/explore
// @desc    Get all NFTs for explore page
router.get("/explore", getAllNFTs);

// @route   PUT /api/nft/update-owner/:id
// @desc    Update NFT owner after purchase
router.put("/update-owner/:id", updateOwner); // ✅ added

export default router;
