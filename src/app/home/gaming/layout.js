import React from "react";
import Header from "./components/Header";

export default function layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      {children}
    </div>
  );
}
