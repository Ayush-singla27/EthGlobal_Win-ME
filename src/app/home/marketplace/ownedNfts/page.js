import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const nfts = [
  {
    name: "Speed Upgrade",
    chain: "Base",
    price: "0.31",
    imagePath: "/Nfts/auction-2.jpg",
  },
  
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
    <div className="col-span-5 border-2 border-red-700 flex h-[85vh] rounded-lg justify-center items-center">
      <div className="col-span-1 border-2 border-black-700 flex h-[85vh] rounded-lg  items-center">
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
            
          </div>
        </div>
        
      ))}
      </div>
    </div>
  );
}
