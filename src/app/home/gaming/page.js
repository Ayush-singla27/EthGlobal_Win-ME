"use client";

import routes from "@/routes";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Page() {
  const router = useRouter();

  const routeUser = (path) => {
    router.push(path);
  };

  return (
    <div className=" h-[90vh] w-full p-5 grid grid-rows-2 grid-cols-2 gap-4">
      <btn
        className="flex col-span-1 row-span-1 rounded-lg items-center justify-center border-2 border-red-600 font-bold text-2xl hover:bg-[linear-gradient(to_right_bottom,rgba(49,84,44,0.9),rgba(0,0,0)),url('/track.png')] hover:cursor-pointer"
        onClick={() => routeUser(routes.tryTrackOne)}
      >
        Try Track
      </btn>

      <TooltipProvider>
        <Tooltip delayDuration={1}>
          <TooltipTrigger asChild>
            <btn className="flex col-span-1 row-span-1 rounded-lg items-center justify-center border-2 border-red-600 font-bold text-2xl hover:bg-gradient-to-br from-black via-black  to-red-600">
              Bet 0.10 tokens
            </btn>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black font-bold">
            <p>Coming soon!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={1}>
          <TooltipTrigger asChild>
            <btn className="flex col-span-1 row-span-1 rounded-lg items-center justify-center border-2 border-red-600 font-bold text-2xl hover:bg-gradient-to-br from-black via-black  to-red-600">
              Bet 10 tokens
            </btn>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black font-bold">
            <p>Coming soon!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={1}>
          <TooltipTrigger asChild>
            <btn className="flex col-span-1 row-span-1 rounded-lg items-center justify-center border-2 border-red-600 font-bold text-2xl hover:bg-gradient-to-br from-black via-black  to-red-600">
              Custom Bet
            </btn>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black font-bold">
            <p>Coming soon!</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
