import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export const NFTDetailPopover = ({ nft, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <Card className="w-full max-w-3xl bg-gray-900 text-white">
      <CardContent className="p-6">
        <div className="flex justify-end">
          <Button variant="ghost" onClick={onClose}>
            X
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 flex flex-col justify-around">
            <img
              src={nft.imagePath}
              alt={nft.name}
              className="w-full rounded-lg"
            />
            <Button className="w-full bg-white text-black hover:bg-slate-400">
              Buy
            </Button>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">{nft.name}</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Traits</h3>
              <div className="grid grid-cols-2 gap-2">
                {nft.traits.map((trait, index) => (
                  <div key={index} className="bg-gray-800 p-2 rounded">
                    <p className="text-sm text-gray-400">{trait.type}</p>
                    <p className="font-medium">{trait.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="mb-2">
              <span className="font-semibold">Chain:</span> {nft.chain}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Amount:</span> {nft.price}
            </p>
            <h3 className="text-lg font-semibold mb-2">Listings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-2 text-left">Price (ETH)</th>
                    <th className="p-2 text-left">Quantity</th>
                    <th className="p-2 text-left">Seller</th>
                  </tr>
                </thead>
                <tbody>
                  {nft.listings.map((listing, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-2">{listing.price}</td>
                      <td className="p-2">{listing.quantity}</td>
                      <td className="p-2">{listing.seller}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);
