// blockchain/contractInstance.js
import { ethers } from "ethers";
import dotenv from "dotenv";
import contractABI from "./ContractABI.json" assert { type: "json" };

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

export default contract;
