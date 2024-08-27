import React from "react";
import Separator from "../Separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useSDK } from "@metamask/sdk-react";

export default function PlayerStatistics() {
  const { connected } = useSDK();

  const statistics = [
    ["Games Won", 90],
    ["NFTs Owned", 2],
    ["Total tokens Won", 1000],
  ];

  return (
    <div className="col-span-2 bg-black w-full h-full rounded p-5 text-white font-bold text-3xl ">
      {connected ? (
        <>
          <div className="h-16 flex w-full justify-start items-center ">
            <h1>Player Statistics</h1>
          </div>
          <Separator />
          <Table>
            <TableCaption>You are killing it!</TableCaption>
            <TableBody>
              {statistics.map((statistic, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{statistic[0]}</TableCell>
                  <TableCell>{statistic[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="flex flex-1 justify-center items-center h-full">
          <h1 className="text-center text-base mt-16">
            Please connect to your wallet
          </h1>
        </div>
      )}
    </div>
  );
}
