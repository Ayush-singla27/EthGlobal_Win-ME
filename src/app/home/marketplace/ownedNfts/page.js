import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image";

const ownedNfts = [
  {
    id: 1,
    name: "Speed Upgrade",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-1.jpg",
    traits: [
      { type: "Rarity", value: "Rare" },
      { type: "Boost", value: "+15% Speed" },
      { type: "Duration", value: "Permanent" }
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
      { type: "Effect", value: "Neon Glow" }
    ],
  }
];


const graphQLUrl = 'https://api.studio.thegraph.com/query/66910/win-me-new/version/latest';

async function fetchNFTs() {
  const query = `
                query {
                    nfts(first: 10) {
                        id
                        tokenID
                        owner {
                            id
                        }
                        tokenURI
                    }
                }
            `;

  try {
    const response = await fetch(graphQLUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    const { data } = await response.json();
    displayNFTs(data.nfts);
  } catch (error) {
    console.error('Error fetching NFTs:', error);
  }
}


export default function page() {
  return (
    <div className="col-span-5 border-2 h-[88vh] border-red-700 rounded-lg p-3 overflow-y-scroll">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-max">
        {ownedNfts.map((nft, index) => (
          <Card className="bg-neutral-900 rounded-lg flex flex-col" key={index}>
            <CardContent className="p-3 flex-grow">
              <div className="w-full aspect-w-2 aspect-h-1 mb-3">
                <Image
                  src={nft.imagePath}
                  alt="Nft Image"
                  width={1000}
                  height={500}
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-start flex-col">
                <div className="flex flex-row justify-between px-2">
                  <p className="font-extrabold text-gray-100">{nft.name}</p>

                  <p className="mx-2 font-medium text-gray-100">{nft.chain}</p>
                </div>
                {/* <div className="flex flex-1 mt-2 items-center flex-row">
                  <p className="text-gray-100">Chain:</p>
                </div> */}
                {/* <p className="mt-2 text-gray-100">{nft.price} ETH</p> */}
                <div className="mt-2">
                  {/* <p className="text-gray-100 font-semibold flex justify-center">Traits</p> */}
                  <div className="grid grid-cols-2 gap-1 mt-1 p-2">
                    {nft.traits.map((trait, index) => (
                      <div key={index} className="bg-neutral-800 p-1 rounded">
                        <p className="text-xs text-gray-400">{trait.type}</p>
                        <p className="text-sm text-gray-100">{trait.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </CardContent>
            <CardFooter>
              <Button className="w-full bg-white text-black hover:bg-slate-400">
                List For Sale
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div >
  );
}
