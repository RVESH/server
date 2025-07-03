// utils/verifySignature.js
export const verifySignature = (req, res, next) => {
  const { ownerAddress } = req.body;
  if (!ownerAddress) {
    return res.status(401).json({ error: "Unauthorized: Missing wallet address." });
  }
  // Later: use ethers.js to verify signatures
  next();
};
