import React from "react";
import PlayerProfile from "./PlayerProfile";
import PlayerStatistics from "./PlayerStatistics";
import Navbar from "./Navbar";

export default function Main() {
  return (
    <main className=" grid grid-cols-5 gap-2  min-h-screen w-full p-5 bg-black">
      <PlayerProfile />
      <PlayerStatistics />
      <Navbar />
    </main>
  );
}
