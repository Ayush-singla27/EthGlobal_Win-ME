"use client";

import React, { useRef, useState } from "react";
import { createDirectory, upload } from "ethfs-sdk";
import { Button } from "@/components/ui/button";
import { ethers } from "ethers";
import { ReloadIcon, UploadIcon } from "@radix-ui/react-icons";

export default function DontKnow() {
  //const [ethStorageAddress, setEthStorageAddress] = useState("");
  const [waitingForPublishing, setWaitingForPublishing] = useState(false);
  const inputRef = useRef();
  const [uploadFile, setUploadFile] = useState("");
  const ethStorageAddress = "0xe64fa6A84217F8791Bda44a650e6F12eEB4834d4";

  const addr = "0x4746d2f3d08549a6fDAF1c9E717c621F665FA750";

  const flatDirectoryAbi = [
    "function write(bytes memory name, bytes memory data) external payable",
    "function read(bytes memory name) external view returns (bytes memory, bool)",
    "function writeChunk(bytes memory name, uint256 chunkId, bytes memory data) external payable",
    "function readChunk(bytes memory name, uint256 chunkId) external view returns (bytes memory, bool)",
    "function size(bytes memory name) external view returns (uint256, uint256)",
    "function remove(bytes memory name) external returns (uint256)",
  ];

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (res) => {
        resolve(Buffer.from(res.target.result));
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const flatDirectoryContract = (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(address, flatDirectoryAbi, provider);
    return contract.connect(provider.getSigner());
  };

  const getSigner = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return signer;
  };

  const create = async () => {
    const signer = getSigner();
    try {
      setWaitingForPublishing(true);
      const directoryAddress = await createDirectory(signer);
      setWaitingForPublishing(false);
      console.log(directoryAddress);
      setEthStorageAddress(directoryAddress);
    } catch (error) {
      setWaitingForPublishing(false);
      console.log(error);
    }
  };

  const readChunk = async () => {
    const contract = flatDirectoryContract(ethStorageAddress);
    console.log(uploadFile);
    const hexName = "0x" + Buffer.from(uploadFile, "utf8").toString("hex");
    const content = await contract.readChunk(hexName, 0);
    console.log(content);
  };

  const readSize = async () => {
    const contract = flatDirectoryContract(ethStorageAddress);
    const hexName = "0x" + Buffer.from(uploadFile, "utf8").toString("hex");
    const content = await contract.size(hexName, 0);
    console.log(content);
  };

  // callback, can be null
  const onProgress = (chunkIndex, totalChunk, fileName) => {
    console.log(chunkIndex, totalChunk, fileName, "progress");
  };
  const onSuccess = (fileName) => {
    console.log(fileName, "Success");
  };
  const onError = (message) => {
    console.log(message, "error");
  };

  const onInputChange = async (e) => {
    // e.target.files is pseudo array, need to convert to real array
    const signer = getSigner();
    const rawFiles = Array.from(e.target.files);
    console.log(rawFiles);
    const directoryPath = rawFiles[0].name;
    const fileSize = rawFiles[0].size;
    const content = await readFile(rawFiles[0]);
    setUploadFile(rawFiles[0].name);

    await upload(
      signer,
      ethStorageAddress,
      directoryPath,
      fileSize,
      content,
      onProgress,
      onSuccess,
      onError
    );
  };

  const readData = async (data = uploadFile) => {
    const contract = flatDirectoryContract(ethStorageAddress);
    const hexName = "0x" + Buffer.from(data, "utf8").toString("hex");
    console.log(data);
    const content = await contract.read(hexName);
    console.log(content);
    let hexString = content[0].slice(2);

    let byteArray = Uint8Array.from(Buffer.from(hexString, "hex"));

    let resultString = new TextDecoder("utf-8").decode(byteArray);

    console.log(resultString);
  };

  const writeData = async () => {
    const contract = flatDirectoryContract(ethStorageAddress);
    const hexName = "0x" + Buffer.from(uploadFile, "utf8").toString("hex");
    const data = Buffer.from("Hello", "utf-8");
    const dataWritten = await contract.write(hexName, data);
    console.log(dataWritten);
  };

  return (
    <div className="min-h-screen min-w-screen bg-black justify-center items-center flex flex-col text-white">
      <Button
        className="bg-white text-black m-5 hover:bg-slate-200"
        onClick={() => create()}
        disabled={waitingForPublishing ? true : false}
      >
        {waitingForPublishing ? (
          <>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Creating file
          </>
        ) : (
          <>
            <UploadIcon className="mr-2 h-4 w-4" />
            Create File
          </>
        )}
      </Button>
      <input type="file" ref={inputRef} onChange={(e) => onInputChange(e)} />
      <p>{ethStorageAddress}</p>
      <Button onClick={() => writeData()}>Write Data</Button>
      <Button onClick={() => readData()}>Read Data</Button>
      <Button onClick={() => readChunk()}>Read Chunk</Button>
      <Button onClick={() => readSize()}>Read Size</Button>
      <Button onClick={() => readData("t.txt")}>Read Data</Button>
      <Button onClick={() => readData()}>Read Size</Button>
      <p>{uploadFile}</p>
    </div>
  );
}
