import express from "express";
import { getNonce, verifySignature } from "../controllers/authController.js";

const router = express.Router();

// ✅ Correct: Nonce route should be GET
router.get("/nonce", getNonce);

// ✅ Signature verification
router.post("/verify", verifySignature);

export default router;
