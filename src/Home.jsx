import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import Greenhouse from "./components/GreenHouse";
import SoldGreenhouse from "./components/SoldGreenHouse";

import coinAbi from "./contracts/coin_abi.json";
import fertAbi from "./contracts/fert_abi.json";
import plantsAbi from "./contracts/plants_abi.json";
import { AppContext } from "./context/appContext";

const Home = ({ userBal, fetchInfo }) => {
  const { tokenAdd, fertAdd, plantAdd, setisLoading } = useContext(AppContext);

  const { data: signer } = useSigner();
  const { open } = useWeb3Modal();

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();

  const [greenhBalance, setgreenhBalance] = useState(0);

  const [plantsState, setPlantsState] = useState([]);
  const [planstReadyTosell, setplanstReadyTosell] = useState([]);
  const [planstSold, setplanstSold] = useState([]);
  const [isBoosted, setBoosted] = useState([]);

  const [incubateCount, setincubatecount] = useState(0);

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

  const plantContract = new ethers.Contract(
    plantAdd,
    plantsAbi,
    staticProvider
  );

  const fetchGreenHouses = async () => {
    const greenHouses = await plantContract.greenHousesBalance(address);
    const grenBal = Number(bigNumParser(greenHouses));

    for (let i = 0; i < grenBal; i++) {
      const soldState = await plantContract.isGreenhouseSold(address, i);

      if (soldState) {
        setplanstSold((prevState) => [...prevState, soldState]);
        setPlantsState((prevState) => [...prevState, []]);
      } else {
        const isReady = await plantContract.getPlantsState(address, i);
        const isBoosted = await plantContract.isFertilized(address, i);
        const rawStates = await plantContract.getGreenHouseStates(address, i);

        setplanstReadyTosell((prevState) => [...prevState, isReady]);
        setBoosted((prevState) => [...prevState, isBoosted]);
        setPlantsState((prevState) => [...prevState, rawStates]);
        setplanstSold((prevState) => [...prevState, false]);
      }
    }

    setgreenhBalance(grenBal);
  };

  const refetchGreenHouses = async () => {
    console.log("before fetch", incubateCount);

    const isReady = await plantContract.getPlantsState(
      address,
      greenhBalance + incubateCount
    );
    const isBoosted = await plantContract.isFertilized(
      address,
      greenhBalance + incubateCount
    );
    const rawStates = await plantContract.getGreenHouseStates(
      address,
      greenhBalance + incubateCount
    );

    setincubatecount(incubateCount + 1);

    setplanstReadyTosell((prevState) => [...prevState, isReady]);
    setBoosted((prevState) => [...prevState, isBoosted]);
    setPlantsState((prevState) => [...prevState, rawStates]);
    setplanstSold((prevState) => [...prevState, false]);

    fetchInfo(address);
    console.log("after increase", incubateCount);
  };

  useEffect(() => {
    setInterval(async () => {
      const currenBlock = staticProvider.blockNumber;
      const timestamp = (await staticProvider.getBlock(currenBlock)).timestamp;
      setCurrentBlock(timestamp);
      console.log(timestamp);
    }, 5000);

    fetchGreenHouses();
  }, [address]);

  const bigNumParser = (bigNum) => {
    return ethers.utils.formatUnits(bigNum, 0);
  };

  const incubate = async () => {
    setisLoading(true);
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

      refetchGreenHouses();
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  return (
    <section className="w-full flex justify-center items-center">
      <div className="relative max-w-screen-xl flex-col items-center w-full flex justify-center py-20 gap-5">
        <button
          onClick={incubate}
          className="max-w-md relative flex-col items-center rounded-xl py-10 px-10 gap-2 flex-wrap border-[3px] border-black bg-[#ffda32] w-full flex justify-center"
        >
          {userBal < 10 && (
            <div
              onClick={incubate}
              className="bg-[#010101a8] text-2xl flex justify-center items-center text-white w-full top-0 bottom-0 right-0 left-0 absolute"
            >
              Not enought balance for Incubating
            </div>
          )}

          <h2 className="text-3xl">Incubate Seeds</h2>
          <h2 className="text-lg"> ( Make sure to have atleast 10 seeds! ) </h2>
        </button>
        {greenhBalance > 0 &&
          plantsState
            ?.map((item, index) =>
              planstSold[index] ? (
                <SoldGreenhouse />
              ) : (
                <Greenhouse
                  currentBlock={currentBlock}
                  state={item}
                  sellable={planstReadyTosell[index]}
                  index={index}
                  key={index}
                  signer={signer}
                  address={address}
                  boosted={isBoosted[index]}
                />
              )
            )
            .reverse()}
      </div>
    </section>
  );
};

export default Home;
