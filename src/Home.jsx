import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
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
import { AppContext } from "./context/appContext";

const Home = () => {
  const { tokenAdd, fertAdd, plantAdd } = useContext(AppContext);

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
  const [planstSold, setplanstSold] = useState([]);
  const [isBoosted, setBoosted] = useState([]);

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/polygon_mumbai"
  );

  const [currentBlock, setCurrentBlock] = useState(35467298);

  const connectWallet = () => {
    if (chain?.id !== 80001) {
      switchNetwork?.(80001);
    }

    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };

  const coinContract = new ethers.Contract(tokenAdd, coinAbi, staticProvider);

  const plantContract = new ethers.Contract(
    plantAdd,
    plantsAbi,
    staticProvider
  );

  const fertContract = new ethers.Contract(fertAdd, fertAbi, staticProvider);

  const fetchData = async () => {
    const seedBal = await plantContract.seedsBalance(address);
    const incubSeed = await plantContract.plantsBalance(address);
    const fertBal = await fertContract.balanceOf(address);
    const coinBal = await coinContract.balanceOf(address);

    setSeedBalance(bigNumParser(seedBal));
    setgrowningBalance(bigNumParser(incubSeed));
    setfertBalance(toNumb(fertBal));
    setcoinsBalance(toNumb(coinBal));
  };

  const fetchGreenHouses = async () => {
    const greenHouses = await plantContract.greenHousesBalance(address);
    const grenBal = bigNumParser(greenHouses);

    for (let i = 0; i < grenBal; i++) {
      const soldState = await plantContract.isGreenhouseSold(address, i);
      const isReady = await plantContract.getPlantsState(address, i);
      const isBoosted = await plantContract.isFertilized(address, i);
      const rawStates = await plantContract.getGreenHouseStates(address, i);

      setplanstSold((prevState) => [...prevState, soldState]);
      setplanstReadyTosell((prevState) => [...prevState, isReady]);
      setBoosted((prevState) => [...prevState, isBoosted]);

      setPlantsState((prevState) => [...prevState, rawStates]);
    }

    setgreenhBalance(bigNumParser(greenHouses));
  };

  useEffect(() => {
    setInterval(async () => {
      const currenBlock = staticProvider.blockNumber;
      const timestamp = (await staticProvider.getBlock(currenBlock)).timestamp;
      setCurrentBlock(timestamp);
      console.log(timestamp);
    }, 5000);

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
    if (chain?.id !== 80001) {
      switchNetwork?.(80001);
    }

    const writePlantContract = new ethers.Contract(plantAdd, plantsAbi, signer);

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
        {greenhBalance > 0 &&
          plantsState
            ?.map((item, index) => (
              <Greenhouse
                currentBlock={currentBlock}
                sold={planstSold[index]}
                states={item}
                sellable={planstReadyTosell[index]}
                index={index}
                key={index}
                signer={signer}
                address={address}
                boosted={isBoosted[index]}
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
            <h2>{seedBalance}</h2>
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
