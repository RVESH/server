import express from "express";
import { getNonce, verifySignature } from "../controllers/authController.js";

const router = express.Router();

// ✅ GET Nonce (Wallet Login)
router.post("/nonce", getNonce);

// ✅ Verify Signature
router.post("/verify", verifySignature);

export default router;
