"use client";

import { Button } from "@/components/ui/button";
import routes from "@/routes";
import { ShoppingBagIcon, BadgeCheckIcon, XIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";

export default function SideBar() {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const routeUser = (path) => {
    router.push(path);
  };

  const handleForm = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const amountToBuy = Object.fromEntries(data.entries()).tokensToBuy;
    console.log(amountToBuy);
    setShowDialog(false);
  };

  const path = usePathname();

  return (
    <div className="col-span-1 flex h-[85vh] rounded-lg border-2 border-red-700 p-5  overflow-scroll flex-col ">
      <Button
        className={` hover:bg-white hover:text-black px-7 py-5 my-4 ${
          path === routes.marketplace ? "bg-white text-black" : ""
        } `}
        onClick={() => routeUser(routes.marketplace)}
      >
        <ShoppingBagIcon className="mr-2 h-4 w-4" />
        Marketplace
      </Button>
      <Button
        className={` hover:bg-white hover:text-black px-7 py-5 my-4 ${
          path === routes.playerNfts ? "bg-white text-black" : ""
        }`}
        onClick={() => routeUser(routes.playerNfts)}
      >
        <BadgeCheckIcon className="mr-2 h-4 w-4" />
        Your NFTs
      </Button>
      <Button
        className={"hover:bg-white hover:text-black px-7 py-5 my-4 text-white "}
        onClick={() => setShowDialog(true)}
      >
        <p>Buy Win-Me Tokens</p>
      </Button>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="text-white bg-black border-red-600">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between items-center ">
              {"Let's buy some Win-Me Tokens"}
              <AlertDialogCancel className="h-auto w-auto bg-black border-black hover:bg-black hover:text-white">
                <XIcon />
              </AlertDialogCancel>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <form
                  onSubmit={(e) => handleForm(e)}
                  className="flex w-full justify-between items-center "
                >
                  <Input
                    type="number"
                    min="1"
                    placeholder="Amount to buy"
                    className="text-white"
                    name="tokensToBuy"
                  />
                  <Button type="submit" className="mx-5">
                    Buy
                  </Button>
                </form>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
