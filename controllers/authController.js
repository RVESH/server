import User from "../models/userModel.js";
import { ethers } from "ethers";
import jwt from "jsonwebtoken";

// ✅ Get nonce for wallet address
export const getNonce = async (req, res) => {
  const { walletAddress } = req.body;

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

  res.json({ nonce: user.nonce });
  console.log("Request Body:", req.body);

};


// ✅ Verify Signature & Login
export const verifySignature = async (req, res) => {
  const { walletAddress, signature } = req.body;
  if (!walletAddress || !signature) return res.status(400).json({ message: "Missing data" });

  const user = await User.findOne({ walletAddress });
  if (!user) return res.status(404).json({ message: "User not found" });

  const message = `Sign this message: ${user.nonce}`;
  const signerAddress = ethers.verifyMessage(message, signature);

  if (signerAddress.toLowerCase() !== walletAddress.toLowerCase()) {
    return res.status(401).json({ message: "Signature verification failed" });
  }

  user.nonce = Math.floor(Math.random() * 1000000).toString();
  await user.save();

  const token = jwt.sign({ id: user._id, walletAddress }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({ token, walletAddress });
};
