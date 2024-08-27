"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "@radix-ui/react-icons";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import routes from "@/routes";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSDK } from "@metamask/sdk-react";

export default function Navbar() {
  const { sdk, connected } = useSDK();

  useEffect(() => {}, [connected]);

  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const reRouteUser = (page) => {
    router.push(page);
  };

  const reRouteToGamingPage = (page) => {
    if (connected) {
      router.push(page);
      return;
    }
    setShowDialog(!showDialog);
  };

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      if (accounts.length) {
        reRouteToGamingPage(routes.gaming);
      }
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className=" flex flex-1 flex-col justify-evenly items-center w-full h-full rounded-lg border-2 border-red-700">
      <Button
        className={`my-10 p-5 w-40 ${
          connected ? "bg-white text-black hover:bg-slate-300" : ""
        }`}
        onClick={() => reRouteToGamingPage(routes.gaming)}
      >
        <PlayIcon />
        <p className="ml-2">{"Let's play!"}</p>
      </Button>
      <Button
        className="my-10 p-5 w-40"
        onClick={() => reRouteUser(routes.marketplace)}
      >
        <ShoppingCartIcon />
        <p className="ml-2">{"Let's shop!"}</p>
      </Button>
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent className="text-white bg-black border-red-600">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Hey, we need you to connect your Metamask
            </AlertDialogTitle>
            <AlertDialogDescription>
              {"Don't worry, we are not scamming you 🤭"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="p-4 px-7 w-auto h-auto text-black font-semibold font-xl">
              Cancel
            </AlertDialogCancel>
            <Button
              className="p-4 py-7 bg-white text-black font-semibold hover:bg-slate-300"
              onClick={() => connect()}
            >
              Connect Wallet
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
