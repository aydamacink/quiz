import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { baseSepolia } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Crypto Jargon Quiz",
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  chains: [baseSepolia],
  ssr: false,
});
console.log("WC Project ID:", import.meta.env.VITE_WALLETCONNECT_PROJECT_ID);
