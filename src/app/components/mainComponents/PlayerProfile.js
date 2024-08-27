import React, { useEffect, useState } from "react";
import Image from "next/image";
import Separator from "../Separator";
import { useSDK } from "@metamask/sdk-react";
import { Button } from "@/components/ui/button";

export default function PlayerProfile() {
  const { sdk, connected, account } = useSDK();
  const [address, setAddress] = useState();

  useEffect(() => {
    if (connected) {
      setAddress(
        `${account.substring(0, 3)}...${account.substring(account.length - 3)}`
      );
    }
  }, [connected]);

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className="col-span-2 bg-black  w-full h-full  p-5 text-white font-bold text-3xl justify-center items-center rounded-lg border-2 border-red-700">
      <div className="w-full flex flex-row items-center justify-between">
        {connected ? <h1>Player name</h1> : <h1>Guest 011111</h1>}
        <Button
          className={`p-6  text-black font-semibold hover:bg-slate-300 ${
            connected ? "bg-zinc-800 text-white hover:bg-zinc-800 " : "bg-white"
          } `}
          onClick={() => connect()}
        >
          {connected ? `${address}` : "Connect Wallet"}
        </Button>
      </div>
      <Separator />
      <div className="flex h-[90%] justify-center items-center">
        {connected ? (
          <Image
            src="https://imgs.search.brave.com/IGplFNYMDfC98oN9wbnKp1SX7njBQc8p-yJt222A-jU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9taW5p/bWFsaXN0aWMtY2Fy/dG9vbi1za2V0Y2gt/Z28ta2FydC1yb3Vn/aC1yb2FkLXBlbmNp/bC1kcmF3aW5nLXF1/YWQtcmFjZXItc2l0/dGluZy1kaXJ0LXNp/bXBsaXN0aWMtc3R5/bGUtYXJ0d29yay0y/OTI1MjAyMzIuanBn"
            width={100}
            height={100}
            className="h-[40%] w-[90%] rounded-lg"
            alt="Your Nft Image"
          />
        ) : (
          <h3 className="text-center text-base">
            Connect your wallet to see your incredible goKart
          </h3>
        )}
      </div>
    </div>
  );
}
