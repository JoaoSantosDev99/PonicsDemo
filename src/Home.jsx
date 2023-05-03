import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import nftAbi from "./contracts/nft_abi.json";
import { useWeb3Modal } from "@web3modal/react";
import Greenhouse from "./components/GreenHouse";

import tokenImg from "./assets/token.png";
import fertImg from "./assets/fertilizer.png";
import treeImg from "./assets/seed.png";
import incubated from "./assets/greenhouse.png";

const Home = () => {
  const { data: signer } = useSigner();
  const { open } = useWeb3Modal();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth"
  );

  const connectWallet = () => {
    if (chain?.id !== 1) {
      switchNetwork?.(1);
    }

    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };

  const nftAddress = "0x295aa8fEd0C5049dC4A84D10725EA640efe87A34";

  const readNftContract = new ethers.Contract(
    nftAddress,
    nftAbi,
    staticProvider
  );

  const nftContract = new ethers.Contract(nftAddress, nftAbi, signer);

  // const mintNft = async () => {
  //   if (signer === undefined) {
  //     connectWallet();
  //   }

  //   if (chain?.id !== 1) {
  //     switchNetwork?.(1);
  //   }

  //   if (publicSale) {
  //     try {
  //       const priceMulti =
  //         publicMintCounter >= "1" ? mintAmount : mintAmount - 1;

  //       const mint = await nftContract.mint(mintAmount, {
  //         value: ethers.BigNumber.from(
  //           ethers.utils.parseEther(("0.005" * priceMulti).toString())
  //         ),
  //       });

  //       await mint.wait();
  //       alert("Success");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else {
  //     const priceMulti =
  //       whitelistCounter >= "2"
  //         ? mintAmount
  //         : whitelistCounter === "1"
  //         ? mintAmount - 1
  //         : mintAmount >= 2
  //         ? mintAmount - 2
  //         : mintAmount - 1;

  //     try {
  //       const mintWhitelist = await nftContract.whitelistMint(
  //         hexProof(),
  //         mintAmount,
  //         {
  //           value: ethers.BigNumber.from(
  //             ethers.utils.parseEther(("0.005" * priceMulti).toString())
  //           ),
  //         }
  //       );

  //       await mintWhitelist.wait();
  //       alert("Success");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // on load
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const privateCounter = await readNftContract.totalWhitelistMint(address);
  //     const publicCounter = await readNftContract.totalPublicMint(address);
  //     const isPuclicOn = !whiteList.includes(address.toLocaleLowerCase());

  //     setWhitelistCounter(ethers.utils.formatUnits(privateCounter, 0));
  //     setPublicMintCounter(ethers.utils.formatUnits(publicCounter, 0));

  //     setPublicSale(isPuclicOn);
  //   };

  //   fetchData();
  // }, []);

  return (
    <section className="w-full flex justify-center items-center">
      <div className="relative max-w-screen-xl flex-col items-center w-full flex justify-center py-20 gap-5">
        <Greenhouse />
        <Greenhouse sellable />
        <Greenhouse boosted />
        <Greenhouse sold />

        <div
          className={
            "max-w-3xl relative rounded-xl py-10 px-10 gap-2 flex-wrap border-[3px] border-black bg-[#ffda32] w-full flex justify-center"
          }
        >
          <h2 className="text-2xl">Incubate Seeds +</h2>
        </div>

        {/* Stats Buttons */}
        <div className="fixed p-2 rounded-md flex gap-3 bottom-12 right-12 bg-[#4c4c4c]">
          <div className="flex flex-col px-5 py-2 gap-1 bg-white items-center rounded-md">
            <img
              src={treeImg}
              alt=""
              className="w-10 h-10"
            />
            <h2>12</h2>
          </div>
          <div className="flex flex-col px-5 py-2 gap-1 bg-white items-center rounded-md">
            <img
              src={incubated}
              alt=""
              className="w-10 h-10"
            />
            <h2>12</h2>
          </div>
          <div className="flex flex-col px-5 py-2 gap-1 bg-white items-center rounded-md">
            <img
              src={fertImg}
              alt=""
              className="w-10 h-10"
            />
            <h2>12</h2>
          </div>
          <div className="flex flex-col px-5 py-2 gap-1 bg-white items-center rounded-md">
            <img
              src={tokenImg}
              alt=""
              className="w-10 h-10"
            />
            <h2>12</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
