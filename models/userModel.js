// import mongoose from "mongoose";
//
// const userSchema = new mongoose.Schema({
//   wallet: { type: String, required: true, unique: true },
//   nonce: { type: String, required: true }, // Random code for verification
//   dp: { type: String }, // Optional: Profile Pic
//   banner: { type: String }, // Optional: Banner Pic
// }, { timestamps: true });
//
// const User = mongoose.model("User", userSchema);
// export default User;
// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  wallet: { type: String, required: true, unique: true },
  nonce: { type: String, required: true },
  // email: { type: String, required: true, unique: true },  // tab dobara banega

});

export default mongoose.model("User", userSchema);
