// blockchain/contractInstance.js
import { ethers } from "ethers";
import dotenv from "dotenv";
// import contractABI from "./ContractABI.json" assert { type: "json" };
import fs from 'fs';
const contractABI = JSON.parse(fs.readFileSync('./blockchain/ContractABI.json', 'utf-8')); //This won’t show warnings and works in all Node.js versions.

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);


console.log("Connected Contract Address:", contract.target);



export default contract;
