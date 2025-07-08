import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    walletAddress: { type: String, required: true, unique: true },
    nonce: { type: String, default: () => Math.floor(Math.random() * 1000000).toString() },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
