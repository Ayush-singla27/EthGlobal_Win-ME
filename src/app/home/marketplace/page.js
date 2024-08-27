import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const nfts = [
  {
    name: "Speed Upgrade",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-1.jpg",
  },
  {
    name: "Blue Pain",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-2.jpg",
  },
  {
    name: "Rocket Launch",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-3.jpg",
  },
  {
    name: "Red Bull Skin",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-4.jpg",
  },
  {
    name: "Red Bull Skin",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-4.jpg",
  },
];

export default function MarketPlace() {
  return (
    <div className="col-span-5 border-2 border-red-700 h-[85vh] rounded-lg  grid grid-cols-4 gap-2 p-2 overflow-y-scroll">
      {nfts.map((nft, index) => (
        <div
          className="flex flex-1 bg-neutral-900 h-auto rounded-lg flex-col p-3"
          key={index}
        >
          <div className="h-auto w-full">
            <Image
              src={nft.imagePath}
              alt="Nft Image"
              layout="responsive"
              width={1000}
              height={500}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-1 justify-start  flex-col">
            <p className="mt-3 font-extrabold">{nft.name}</p>
            <div className="flex flex-1 mt-2 items-center flex-row">
              <p className="text-gray-100">Chain:</p>
              <p className="mx-2 font-medium">{nft.chain}</p>
            </div>
            <p className="mt-2">{nft.price} ETH</p>
            <Button className="mt-2 w-40 bg-white text-black hover:bg-slate-400 ">
              Buy
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
