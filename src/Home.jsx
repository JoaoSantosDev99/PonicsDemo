import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import Greenhouse from "./components/GreenHouse";

import tokenImg from "./assets/token.png";
import fertImg from "./assets/fertilizer.png";
import treeImg from "./assets/seed.png";
import incubated from "./assets/greenhouse.png";
import greenh from "./assets/greenhouse2.png";

import coinAbi from "./contracts/coin_abi.json";
import fertAbi from "./contracts/fert_abi.json";
import plantsAbi from "./contracts/plants_abi.json";

const Home = () => {
  const coinsAddress = "0x17f89C640268966f8804C01b052E70e66C3680e6";
  const fertAddress = "0x95B485559823d48929ce446C7d9e211Cf682C8Bd";
  const plantsAddress = "0xec71648D56e960921c297A7Ef7B1d1f953B56EFE";

  const { data: signer } = useSigner();
  const { open } = useWeb3Modal();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();

  const [seedBalance, setSeedBalance] = useState(0);
  const [coinsBalance, setcoinsBalance] = useState(0);
  const [fertBalance, setfertBalance] = useState(0);
  const [growningBalance, setgrowningBalance] = useState(0);

  const [greenhBalance, setgreenhBalance] = useState(0);

  const [plantsState, setPlantsState] = useState([]);
  const [planstReadyTosell, setplanstReadyTosell] = useState([]);

  const [allStates, setallStates] = useState(false);

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

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

  // setInterval(async () => {
  //   await fetchGreenHouses();
  // }, 5000);

  const fetchGreenHouses = async () => {
    const greenHouses = await plantContract.greenHouseBalance(address);

    for (let i = 0; i < greenHouses; i++) {
      const plantStates = await plantContract.getPlantsState(address, i);

      setPlantsState((prevState) => [...prevState, plantStates[0]]);
      setplanstReadyTosell((prevState) => [...prevState, plantStates[1]]);
    }

    setgreenhBalance(bigNumParser(greenHouses));
  };

  useEffect(() => {
    fetchData();
    fetchGreenHouses();
  }, []);

  const bigNumParser = (bigNum) => {
    return ethers.utils.formatUnits(bigNum, 0);
  };

  const toNumb = (bigNum) => {
    return Number(ethers.utils.formatUnits(bigNum, 18)).toFixed(0);
  };

  const incubate = async () => {
    if (signer === undefined) {
      connectWallet();
    }
    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }

    const writePlantContract = new ethers.Contract(
      plantsAddress,
      plantsAbi,
      signer
    );

    try {
      const incubate = await writePlantContract.incubatePlants();
      await incubate.wait();

      alert("Success");
      fetchData();
    } catch (error) {
      console.log(error);
    }

    console.log("Incubate");
  };

  return (
    <section className="w-full flex justify-center items-center">
      <div className="relative max-w-screen-xl flex-col items-center w-full flex justify-center py-20 gap-5">
        {allStates ? (
          <button
            onClick={() => setallStates(false)}
            className="bg-[#fff] px-10 py-4 rounded-xl"
          >
            Hidde demos
          </button>
        ) : (
          <button
            onClick={() => setallStates(true)}
            className="bg-[#fff] px-10 py-4 rounded-xl"
          >
            See all states
          </button>
        )}
        {allStates && (
          <>
            <h2 className="p-3 bg-purple-500 mt-10 rounded-xl">Growing</h2>
            <Greenhouse />

            <h2 className="p-3 bg-purple-500 mt-10 rounded-xl">
              Ready to Sell
            </h2>
            <Greenhouse sellable />

            <h2 className="p-3 bg-purple-500 mt-10 rounded-xl">
              Growing with fertilizers
            </h2>
            <Greenhouse boosted />

            <h2 className="p-3 bg-purple-500 mt-10 rounded-xl">Sold</h2>
            <Greenhouse sold />
          </>
        )}
        {greenhBalance > 0 &&
          plantsState
            ?.slice(-greenhBalance)
            .map((item, index) => (
              <Greenhouse
                states={item}
                sellable={planstReadyTosell[index]}
              />
            ))
            .reverse()}

        <button
          onClick={incubate}
          className="max-w-3xl flex-col items-center relative rounded-xl py-10 px-10 gap-2 flex-wrap border-[3px] border-black bg-[#ffda32] w-full flex justify-center"
        >
          <h2 className="text-3xl">Incubate Seeds</h2>
          <h2 className="text-lg"> ( Make sure to have atleast 10 seeds! ) </h2>
        </button>

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
              src={greenh}
              alt=""
              className="w-10 h-10"
            />
            <h2>{greenhBalance}</h2>
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

export default Home;
