import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

export default function layout({ children }) {
  return (
    <div className=" min-h-screen bg-black text-white">
      <Header />
      <div className="grid grid-cols-6 gap-2  min-h-[80vh] w-full p-5 bg-black">
        <SideBar />
        {children}
      </div>
    </div>
  );
}
