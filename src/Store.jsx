import tree from "./assets/seed.png";
import fert from "./assets/fertilizer.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import tokenImg from "./assets/token.png";
import fertImg from "./assets/fertilizer.png";
import treeImg from "./assets/seed.png";
import incubated from "./assets/greenhouse.png";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import { ethers } from "ethers";

import coinAbi from "./contracts/coin_abi.json";
import fertAbi from "./contracts/fert_abi.json";
import plantsAbi from "./contracts/plants_abi.json";

const Store = () => {
  const [fertAmount, setFertAmount] = useState(1);

  const [seedBalance, setSeedBalance] = useState(0);
  const [coinsBalance, setcoinsBalance] = useState(0);
  const [fertBalance, setfertBalance] = useState(0);
  const [growningBalance, setgrowningBalance] = useState(0);

  const coinsAddress = "0x17f89C640268966f8804C01b052E70e66C3680e6";
  const fertAddress = "0x95B485559823d48929ce446C7d9e211Cf682C8Bd";
  const plantsAddress = "0xec71648D56e960921c297A7Ef7B1d1f953B56EFE";

  const incrementInput = () => {
    setFertAmount((prevState) => prevState + 1);
  };

  const decrementInput = () => {
    if (fertAmount === 1) return;
    setFertAmount((prevState) => prevState - 1);
  };

  const { data: signer } = useSigner();
  const { open } = useWeb3Modal();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const coinContract = new ethers.Contract(
    coinsAddress,
    coinAbi,
    staticProvider
  );
  const plantContract = new ethers.Contract(
    plantsAddress,
    plantsAbi,
    staticProvider
  );
  const fertContract = new ethers.Contract(
    fertAddress,
    fertAbi,
    staticProvider
  );

  const fetchData = async () => {
    const seedBal = await plantContract.plantsBalance(address);
    const incubSeed = await plantContract.plantsGrowing(address);
    const fertBal = await fertContract.balanceOf(address);
    const coinBal = await coinContract.balanceOf(address);

    setSeedBalance(bigNumParser(seedBal));
    setgrowningBalance(bigNumParser(incubSeed));
    setfertBalance(toNumb(fertBal));
    setcoinsBalance(toNumb(coinBal));
  };

  useEffect(() => {
    if (signer === undefined) return;
    fetchData();
  }, []);

  const bigNumParser = (bigNum) => {
    return ethers.utils.formatUnits(bigNum, 0);
  };

  const toNumb = (bigNum) => {
    return Number(ethers.utils.formatUnits(bigNum, 18)).toFixed(0);
  };

  const connectWallet = () => {
    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }

    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };

  const buySeeds = async () => {
    if (signer === undefined) {
      connectWallet();
    }
    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }

    const coinContract = new ethers.Contract(coinsAddress, coinAbi, signer);
    const plantContract = new ethers.Contract(plantsAddress, plantsAbi, signer);

    try {
      const approve = await coinContract.approve(
        plantsAddress,
        ethers.utils.parseEther("100")
      );
      await approve.wait();

      const buyPlant = await plantContract.buyPlant();
      await buyPlant.wait();

      alert("Success!");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const buyFerts = async () => {
    if (signer === undefined) {
      connectWallet();
    }
    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }

    const coinContract = new ethers.Contract(coinsAddress, coinAbi, signer);
    const plantContract = new ethers.Contract(plantsAddress, plantsAbi, signer);

    try {
      const approve = await coinContract.approve(
        plantsAddress,
        ethers.utils.parseEther((fertAmount * 5).toString())
      );
      await approve.wait();

      const buyPlant = await plantContract.buyFertilizer(fertAmount);
      await buyPlant.wait();

      alert("Success!");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full mb-10 flex justify-center items-center px-2">
      <div className="max-w-screen-xl justify-center w-full border-black mt-32 p-10 gap-10 flex items-center flex-col">
        <div className="flex gap-5">
          {/* Seeds */}
          <div className="flex relative bg-[#fff] w-[400px] py-10 rounded-xl flex-col items-center gap-7">
            {/* Price */}
            <div className="absolute flex px-4 border-[3px] top-5 right-5 border-black py-2 gap-4 bg-[#e5e5e5] items-center rounded-md">
              <img
                src={tokenImg}
                alt=""
                className="w-10 h-10"
              />
              <h2 className="text-3xl">10</h2>
            </div>

            <img
              src={tree}
              alt=""
              className="w-52 h-52"
            />
            <h3 className="text-3xl">Buy 10x Seeds</h3>
            <button
              onClick={buySeeds}
              className="p-4 bg-[#92f73a] text-xl rounded-xl"
            >
              Buys 10 Seeds
            </button>
          </div>

          {/* Ferts */}
          <div className="flex relative bg-[#fff] w-[500px] py-10 rounded-xl flex-col items-center">
            {/* Price */}
            <div className="absolute flex px-4 border-[3px] top-5 right-5 border-black py-2 gap-4 bg-[#e5e5e5] items-center rounded-md">
              <img
                src={tokenImg}
                alt=""
                className="w-10 h-10"
              />
              <h2 className="text-3xl">5</h2>
            </div>

            <img
              src={fert}
              alt=""
              className="w-52 h-52"
            />
            <h3 className="text-3xl">Buy {fertAmount} Fertilizers</h3>
            <div className="flex mt-4">
              <button
                onClick={decrementInput}
                className="p-3 w-10 h-10 flex justify-center items-center rounded-lg rounded-tr-none rounded-br-none bg-[#bcbcbc]"
              >
                {" "}
                -{" "}
              </button>
              <span className="flex w-24 justify-center items-center p-2 bg-[#e9e9e9]">
                {fertAmount}
              </span>
              <button
                onClick={incrementInput}
                className="p-3 w-10 h-10 flex justify-center items-center rounded-lg rounded-tl-none rounded-bl-none bg-[#bcbcbc]"
              >
                +{" "}
              </button>
            </div>
            <button
              onClick={buyFerts}
              className="p-4 mt-3 bg-[#f7993a] text-xl rounded-xl"
            >
              Buys Fertilizers
            </button>
          </div>
        </div>

        {/* Back button */}
        <Link to="/">
          <button className="text-4xl p-4 rounded-xl px-10 text-white bg-[#393939]">
            Back to Plants
          </button>
        </Link>

        {/* Balance Buttons */}
        <div className="fixed p-2 rounded-md flex gap-3 bottom-12 right-12 bg-[#4c4c4c]">
          <div className="flex flex-col px-5 py-2 gap-1 bg-white items-center rounded-md">
            <img
              src={treeImg}
              alt=""
              className="w-10 h-10"
            />
            <h2>{seedBalance - growningBalance}</h2>
          </div>
          <div className="flex flex-col px-5 py-2 gap-1 bg-white items-center rounded-md">
            <img
              src={incubated}
              alt=""
              className="w-10 h-10"
            />
            <h2>{growningBalance}</h2>
          </div>
          <div className="flex flex-col px-5 py-2 gap-1 bg-white items-center rounded-md">
            <img
              src={fertImg}
              alt=""
              className="w-10 h-10"
            />
            <h2>{fertBalance}</h2>
          </div>
          <div className="flex flex-col px-5 py-2 gap-1 bg-white items-center rounded-md">
            <img
              src={tokenImg}
              alt=""
              className="w-10 h-10"
            />
            <h2>{coinsBalance}</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Store;
