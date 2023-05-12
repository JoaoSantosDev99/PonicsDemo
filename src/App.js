import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Store from "./Store";
import Home from "./Home";
import Loading from "./components/UI/Loading/Loading";
import { AppContext } from "./context/appContext";

import tokenImg from "./assets/token.png";
import fertImg from "./assets/fertilizer.png";
import treeImg from "./assets/seed.png";
import incubated from "./assets/greenhouse.png";
import greenh from "./assets/greenhouse2.png";

import plantsAbi from "./contracts/plants_abi.json";
import coinAbi from "./contracts/coin_abi.json";
import fertAbi from "./contracts/fert_abi.json";

import { ethers } from "ethers";
import { useAccount } from "wagmi";

function App() {
  const { plantAdd, fertAdd, tokenAdd, isLoading, staticProvider } =
    useContext(AppContext);

  const { address, isConnected } = useAccount();

  const [seedBalance, setseedBalance] = useState(0);
  const [greenhBalance, setgreenhBalance] = useState(0);
  const [fertBalance, setfertBalance] = useState(0);
  const [coinsBalance, setcoinsBalance] = useState(0);
  const [growningBalance, setgrowningBalance] = useState(0);

  const [test, settest] = useState("before");
  const bigNumParser = (bigNum) => {
    return ethers.utils.formatUnits(bigNum, 0);
  };

  const toNumb = (bigNum) => {
    return Number(ethers.utils.formatUnits(bigNum, 18)).toFixed(0);
  };

  const coinContract = new ethers.Contract(tokenAdd, coinAbi, staticProvider);

  const plantContract = new ethers.Contract(
    plantAdd,
    plantsAbi,
    staticProvider
  );

  const fertContract = new ethers.Contract(fertAdd, fertAbi, staticProvider);

  const fetchData = async (add) => {
    console.log("Fetch data ap 1");

    const seedBal = await plantContract.seedsBalance(add);
    const incubSeed = await plantContract.plantsBalance(add);
    const fertBal = await fertContract.balanceOf(add);
    const coinBal = await coinContract.balanceOf(add);

    setseedBalance(bigNumParser(seedBal));
    setgrowningBalance(bigNumParser(incubSeed));
    setfertBalance(toNumb(fertBal));
    setcoinsBalance(toNumb(coinBal));

    console.log("Fetch data ap 2");
  };

  useEffect(() => {
    fetchData(address);
    // const handleShadow = () => {
    //   if (window.scrollY >= 1200) {
    //     setBackTop(true);
    //   } else {
    //     setBackTop(false);
    //   }
    // };
    // window.addEventListener("scroll", handleShadow);
  }, [address]);

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0 });
  // };

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        {isLoading && <Loading />}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/store"
            element={<Store fetchInfo={settest} />}
          />
        </Routes>

        {/* Balance Buttons */}
        {test}
        <div className="fixed p-2 rounded-md flex gap-3 bottom-12 right-12 bg-[#4c4c4c]">
          {isConnected ? (
            <div className="flex gap-3">
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
          ) : (
            <div className="flex gap-3">
              <div className="flex flex-col px-5 py-2 gap-1 bg-[#1e1e1e] items-center rounded-md">
                <div className="h-14 flex justify-center items-center">
                  <h2 className="text-white">Connect To Show Stats</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
