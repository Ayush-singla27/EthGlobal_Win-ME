"use client";

import { Button } from "@/components/ui/button";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center flex-1 bg-black text-white min-h-screen">
      Future landing page
      <Button
        className="bg-white text-black m-5 hover:bg-slate-200"
        onClick={() => router.push(routes.home)}
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
