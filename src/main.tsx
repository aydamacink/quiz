import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { sdk } from "@farcaster/miniapp-sdk";

import { wagmiConfig } from "./wagmiConfig"; // web + RainbowKit config
import { wagmiConfigMiniApp } from "./wagmiConfig.miniapp"; // Farcaster miniapp config

const queryClient = new QueryClient();

function Root() {
  const [isMiniApp, setIsMiniApp] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const v = await sdk.isInMiniApp();
        setIsMiniApp(v);
      } catch {
        setIsMiniApp(false);
      }
    })();
  }, []);

  const config = useMemo(() => {
    // While detection runs, default to web config
    if (isMiniApp === null) return wagmiConfig;
    return isMiniApp ? wagmiConfigMiniApp : wagmiConfig;
  }, [isMiniApp]);

  // In Mini App mode, we generally don't want RainbowKit UI wrappers.
  const wrapWithRainbowKit = isMiniApp === false || isMiniApp === null;

  const app = <App isMiniApp={isMiniApp === true} />;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {wrapWithRainbowKit ? (
          <RainbowKitProvider>{app}</RainbowKitProvider>
        ) : (
          app
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
