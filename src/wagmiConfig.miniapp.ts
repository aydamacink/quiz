import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";

export const wagmiConfigMiniApp = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  connectors: [farcasterMiniApp()],
});
