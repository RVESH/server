import User from "../models/userModel.js";
import { ethers } from "ethers";
import jwt from "jsonwebtoken";

// ✅ Get nonce for wallet address
export const getNonce = async (req, res) => {
  try {
    const walletAddress = req.query.wallet;  // ✅ this is for GET request

    if (!walletAddress) {
      return res.status(400).json({ message: "Wallet address required" });
    }

    let user = await User.findOne({ wallet: walletAddress });

    if (!user) {
      user = await User.create({
        wallet: walletAddress,
        nonce: Math.floor(Math.random() * 1000000).toString()
      });
    } else {
      user.nonce = Math.floor(Math.random() * 1000000).toString();
      await user.save();
    }

    console.log("✅ Nonce generated:", user.nonce);
    res.json({ success: true, nonce: user.nonce }); // success added

  } catch (error) {
    console.error("❌ GetNonce Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



// ✅ Verify Signature & Login
export const verifySignature = async (req, res) => {
  try {
    const { walletAddress, signature } = req.body;

    if (!walletAddress || !signature)
      return res.status(400).json({ message: "Missing data" });

    const user = await User.findOne({ wallet: walletAddress }); // 👈 YEH SUDHAR!

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const message = `Sign this message: ${user.nonce}`;
    const signerAddress = ethers.verifyMessage(message, signature);

    if (signerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ message: "Signature verification failed" });
    }

    // ✅ Update nonce
    user.nonce = Math.floor(Math.random() * 1000000).toString();
    await user.save();

    const token = jwt.sign(
      { id: user._id, walletAddress },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, walletAddress });

  }  catch (error) {
  console.error("❌ Verify Signature Error:", error); // ✅ this is good
  res.status(500).json({
    success: false,
    message: "Server Error",
    error: error.message,  // 👈 Add this
    stack: error.stack     // 👈 (optional) for full details
  });
}
};
