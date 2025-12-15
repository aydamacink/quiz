import type { Address } from "viem";

/**
 * Chain IDs
 */
export const BASE_MAINNET_CHAIN_ID = 8453;
export const BASE_SEPOLIA_CHAIN_ID = 84532;

/**
 * Contract addresses
 * - Sepolia: already deployed
 * - Mainnet: fill in after deployment
 */
export const QUIZ_BADGE_CONTRACTS: Record<number, Address> = {
  [BASE_SEPOLIA_CHAIN_ID]:
    "0xFA9215EC825Dd670636c95F0C0AD924F62eC5C59", // Base Sepolia 

  // TODO: replace after mainnet deployment
  [BASE_MAINNET_CHAIN_ID]:
    "0xa2C563212b15D34Bbc9Af5108093107fd14eF181", // Base Mainnet 
};

/**
 * Helper to safely get the correct contract for the current chain
 */
export function getQuizBadgeContract(chainId?: number): Address | undefined {
  if (!chainId) return undefined;
  return QUIZ_BADGE_CONTRACTS[chainId];
}

/**
 * Token IDs
 * 1 = Crypto Curious
 * 2 = DeFi Teen
 * 3 = On-Chain Adult
 */
export const QUIZ_BADGE_TOKEN_IDS = {
  CRYPTO_CURIOUS: 1n,
  DEFI_TEEN: 2n,
  ONCHAIN_ADULT: 3n,
} as const;
