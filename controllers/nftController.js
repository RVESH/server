// controllers/nftController.js
import NFT from "../models/nftModel.js";

/**
 * @desc    Create a new NFT
 * @route   POST /api/nft/create
 */
export const createNFT = async (req, res) => {
  try {
    const { title, description, image, price, owner } = req.body;

    if (!title || !description || !image || !price || !owner) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newNFT = new NFT({ title, description, image, price, owner });
    await newNFT.save();

    return res.status(201).json({
      success: true,
      message: "NFT created successfully",
      data: newNFT,
    });
  } catch (error) {
    console.error("❌ Create NFT Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc    Get all NFTs
 * @route   GET /api/nft/all
 */
export const getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: nfts,
    });
  } catch (error) {
    console.error("❌ Fetch NFTs Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @desc    Update NFT Owner after purchase
 * @route   PUT /api/nft/update-owner/:id
 */
export const updateOwner = async (req, res) => {
  try {
    const nft = await NFT.findByIdAndUpdate(
      req.params.id,
      { owner: req.body.newOwner },
      { new: true }
    );

    if (!nft) {
      return res.status(404).json({ success: false, message: "NFT not found" });
    }

    res.status(200).json({
      success: true,
      message: "Owner updated successfully",
      data: nft,
    });
  } catch (err) {
    console.error("❌ Update Owner Error:", err);
    res.status(500).json({ success: false, error: "Failed to update owner" });
  }
};
