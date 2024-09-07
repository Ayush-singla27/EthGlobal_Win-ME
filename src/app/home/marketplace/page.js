"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Image from "next/image";
import { useState } from "react";
import { NFTDetailPopover } from "./components/NFTDetailPopover";

const totalNfts = [
  {
    id: 1,
    name: "Speed Upgrade",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-1.jpg",
    traits: [
      { type: "Rarity", value: "Rare" },
      { type: "Boost", value: "+15% Speed" },
      { type: "Duration", value: "Permanent" },
    ],
    listings: [
      { price: 0.31, quantity: 1, seller: "0x1234...5678" },
      { price: 0.35, quantity: 1, seller: "0xabcd...efgh" },
      { price: 0.4, quantity: 1, seller: "0x9876...5432" },
    ],
  },
  {
    id: 2,
    name: "Blue Pain",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-2.jpg",
    traits: [
      { type: "Rarity", value: "Epic" },
      { type: "Color", value: "Blue" },
      { type: "Effect", value: "Neon Glow" },
    ],
    listings: [
      { price: 0.31, quantity: 1, seller: "0x2345...6789" },
      { price: 0.33, quantity: 1, seller: "0xbcde...fghi" },
    ],
  },
  {
    id: 3,
    name: "Rocket Launch",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-3.jpg",
    traits: [
      { type: "Rarity", value: "Legendary" },
      { type: "Boost", value: "+25% Acceleration" },
      { type: "Cooldown", value: "30 seconds" },
    ],
    listings: [
      { price: 0.31, quantity: 1, seller: "0x3456...7890" },
      { price: 0.36, quantity: 1, seller: "0xcdef...ghij" },
      { price: 0.4, quantity: 1, seller: "0x7890...1234" },
    ],
  },
  {
    id: 4,
    name: "Red Bull Skin",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-4.jpg",
    traits: [
      { type: "Rarity", value: "Uncommon" },
      { type: "Brand", value: "Red Bull" },
      { type: "Effect", value: "Custom Sound" },
    ],
    listings: [
      { price: 0.31, quantity: 1, seller: "0x4567...8901" },
      { price: 0.34, quantity: 1, seller: "0xdefg...hijk" },
    ],
  },
  {
    id: 5,
    name: "Nitro Boost",
    chain: "Base",
    price: "0.35",
    imagePath: "/Nfts/auction-4.jpg",
    traits: [
      { type: "Rarity", value: "Rare" },
      { type: "Boost", value: "+20% Top Speed" },
      { type: "Uses", value: "5 per race" },
    ],
    listings: [
      { price: 0.35, quantity: 1, seller: "0x5678...9012" },
      { price: 0.38, quantity: 1, seller: "0xefgh...ijkl" },
      { price: 0.4, quantity: 1, seller: "0x1234...abcd" },
    ],
  },
];

export default function MarketPlace() {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [nfts, setNfts] = useState(totalNfts);

  const handleNFTClick = (index) => {
    setSelectedNFT(nfts[index]);
  };

  const handleClosePopover = () => {
    setSelectedNFT(null);
  };
  return (
    <div className="col-span-5 border-2 border-red-700 h-[88vh] rounded-lg  grid grid-cols-4 gap-2 p-3 overflow-y-scroll">
      {nfts.map((nft, index) => (
        <Card
          className="flex flex-1 bg-neutral-900 h-auto rounded-lg flex-col cursor-pointer"
          key={index}
          onClick={() => handleNFTClick(index)}
        >
          <CardContent>
            <div className="h-auto w-full">
              <Image
                src={nft.imagePath}
                alt="Nft Image"
                width={1000}
                height={500}
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-1 justify-start flex-col">
              <div className="flex flex-row justify-between text-gray-100">
                <p className="mt-3 font-extrabold">{nft.name}</p>
                {/* <div className="flex flex-1 mt-2 items-center flex-row">
                  <p className="text-gray-100">Chain:</p>
                  <p className="mx-2 font-medium">{nft.chain}</p>
                </div> */}
                <p className="mt-3 text-gray-100">{nft.price} ETH</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-white text-black hover:bg-slate-400">
              Buy
            </Button>
          </CardFooter>
        </Card>
      ))}
      {selectedNFT && (
        <NFTDetailPopover nft={selectedNFT} onClose={handleClosePopover} />
      )}
    </div>
  );
}
