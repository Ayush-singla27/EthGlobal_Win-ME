"use client";

import routes from "@/routes";
import { StepBack } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSDK } from "@metamask/sdk-react";

export default function Header() {
  const router = useRouter();
  const { connected } = useSDK();

  useEffect(() => {
    if (!connected) {
      reRouteUser(routes.home);
    }
  }, [connected]);

  const reRouteUser = (page) => {
    router.push(page);
  };

  return (
    <div className="flex w-full h-20 border-b-2 border-red-700 items-center justify-between p-5">
      <div className="flex w-auto justify-between items-center">
        <div className="hover:cursor-pointer p-4">
          <StepBack
            onClick={() => reRouteUser(routes.home)}
            className="mr-10 "
          />
        </div>
        <h1 className="font-bold text-2xl">Username</h1>
      </div>
    </div>
  );
}
