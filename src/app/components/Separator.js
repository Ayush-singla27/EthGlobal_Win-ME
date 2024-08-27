import React from "react";

export default function Separator({ height = "0.5px" }) {
  return <div className={`h-[${height}] bg-white w-full my-3`} />;
}
