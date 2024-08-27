"use client";

import { nets } from "@/nets";
import { useSDK } from "@metamask/sdk-react";
import { ethers } from "ethers";
import React, { useEffect } from "react";

export default function Page() {
  const providers = new ethers.providers.JsonRpcProvider(
    `${nets.sepolia}${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
  );
  const { sdk, balance, connected, account } = useSDK();

  useEffect(() => {}, []);

  const getBlockNumber = async () => {
    try {
      console.log(account);
      const accounts = await sdk.connect();
      let balance = await providers.getBalance(accounts[0]);
      balance = ethers.utils.formatEther(balance._hex);
      console.log(balance);
    } catch (error) {
      console.log(error);
    }
    //console.log(block);
  };

  return (
    <div>
      {balance}
      <button onClick={() => getBlockNumber()}>Hola</button>
    </div>
  );
}
