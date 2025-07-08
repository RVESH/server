// controllers/nftController.js
import contract from "../blockchain/contractInstance.js";
import NFT from "../models/nftModel.js";

/**
 * ✅ Mint NFT (Blockchain + DB)
 * @route POST /api/nft/mint
 */
export const mintNFT = async (req, res) => {
  try {
    const { title, description, image, price, owner, tokenId } = req.body;

    if (!title || !description || !image || !price || !owner || !tokenId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Blockchain Mint Example (Adjust according to your Contract Function)
    const tx = await contract.mintNFT(owner, tokenId);  // ⚠️ Replace with your Contract Function
    await tx.wait();

    const newNFT = new NFT({ title, description, image, price, owner });
    await newNFT.save();

    return res.status(201).json({
      success: true,
      message: "NFT minted successfully on blockchain and saved to DB",
      data: newNFT,
      txHash: tx.hash,
    });
  } catch (error) {
    console.error("❌ Mint NFT Error:", error);
    return res.status(500).json({
      success: false,
      message: "Minting failed",
      error: error.message,
    });
  }
};

/**
 * ✅ Transfer NFT (Blockchain Only)
 * @route POST /api/nft/transfer
 */
export const transferNFT = async (req, res) => {
  try {
    const { toAddress, tokenId } = req.body;

    // ✅ Transfer from Backend Wallet (Safer)
    const tx = await contract.transferFrom(
      process.env.BACKEND_WALLET_ADDRESS,  // 👈 Backend Wallet as Owner
      toAddress,
      tokenId
    );
    await tx.wait();

    res.json({
      success: true,
      message: "NFT transferred successfully!",
      txHash: tx.hash,
    });
  } catch (err) {
    console.error("❌ Transfer NFT Error:", err);
    res.status(500).json({
      success: false,
      message: "Transfer failed",
      error: err.message,
    });
  }
};

/**
 * ✅ Get All NFTs (From DB)
 * @route GET /api/nft/all
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
 * ✅ Update Owner in DB (Optional)
 * @route PUT /api/nft/update-owner/:id
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
      message: "Owner updated in DB successfully",
      data: nft,
    });
  } catch (err) {
    console.error("❌ Update Owner Error:", err);
    res.status(500).json({
      success: false,
      error: "Failed to update owner in DB",
    });
  }
};
