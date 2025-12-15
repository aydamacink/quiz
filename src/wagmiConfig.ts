import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base, baseSepolia } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Crypto Jargon Quiz",

  // WalletConnect Project ID (required for RainbowKit)
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,

  /**
   * Dual-chain support:
   * - Base Sepolia → browser testing
   * - Base Mainnet → Farcaster Mini App
   */
  chains: [base, baseSepolia],

  ssr: false,
});

// Optional sanity check (safe to remove later)
console.log(
  "WalletConnect Project ID:",
  import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
);
