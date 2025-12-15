import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const BASE_MAINNET_RPC_URL = process.env.BASE_MAINNET_RPC_URL || "";
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    base: {
      url: BASE_MAINNET_RPC_URL,
      accounts,
      chainId: 8453,
    },
    baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL,
      accounts,
      chainId: 84532,
    },
  },
};

export default config;
