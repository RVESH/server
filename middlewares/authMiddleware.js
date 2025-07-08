// /middlewares/authMiddleware.js

// Dummy Auth Example (Replace with real JWT or Wallet Auth later)
const authMiddleware = (req, res, next) => {
  // Example: Check if backend wallet matches (you can improve later)
  const backendWallet = process.env.BACKEND_WALLET_ADDRESS;
  const { walletAddress } = req.body;

  if (!walletAddress || walletAddress !== backendWallet) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  next();
};

export default authMiddleware;
