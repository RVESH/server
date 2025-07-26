// testSignature.js
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

// ✅ Private key sirf test ke liye use karo (kabhi bhi publicly share mat karna)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

// ⚠️ Yeh nonce wohi hona chahiye jo tum /api/auth/nonce se le rahe ho
const nonce ="855198";  // <-- isse curl karke backend se actual value lo

const message = `Sign this message: ${nonce}`;

const main = async () => {
  const signature = await wallet.signMessage(message);
  console.log("Wallet Address:", wallet.address);
  console.log("Signed Message:", message);
  console.log("Signature:", signature);
};

main();


//
// Wallet Address: 0xD1be2AE2F378Ca985E177387F04D85e8cA4dcbAB
// Signed Message: Sign this message: 319277
// Signature: 0xa4dbd6116f6ce5a5e07f461d628a20709baf11e913955c65678bfd204b24e59854cb5f766418777b500c3d40b9968c54f882bbc0308df96e70b3ee182d33f5701b




//
// 0x80758f419fd488f80d94db96e54fc56a1c86f466e18823b6ddfe9dea5466034271d
// 111703cc127e5882a5d79928a29f2fc6afd44555e6de97846dee5c490a7331b
//
//
//
//
// curl -X POST http://localhost:5000/api/auth/verify \
// -H "Content-Type: application/json" \
// -d '{
//   "walletAddress": "0xD1be2AE2F378Ca985E177387F04D85e8cA4dcbAB",
//   "signature": "0xecec813e5219a517fcc346ec0950155a5ebdb4925a14b92cabe47c0adfa0532f1e0880da57f06289de3f11633de5827cf7c3479cae0ce57aeabdda5be4ea395d1c"
// }'

//
// curl http://localhost:5000/api/auth/nonce?wallet=0xD1be2AE2F378Ca985E177387F04D85e8cA4dcbAB
