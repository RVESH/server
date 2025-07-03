// models/nftModel.js
import mongoose from "mongoose";

const nftSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    owner: {
      type: String,
      required: [true, "Owner wallet address is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("NFT", nftSchema);
