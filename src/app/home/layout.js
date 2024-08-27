"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({ children }) {
  const path = usePathname();

  return (
    <div>
      <MetaMaskProvider
        debug={false}
        sdkOptions={{
          dappMetadata: {
            name: "Win me Game",
            url: path,
          },
        }}
      >
        {children}
      </MetaMaskProvider>
    </div>
  );
}
