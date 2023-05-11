import Plant from "../UI/Plant";
import fert from "../../assets/fertilizer.png";
import sell from "../../assets/box.png";
import boost from "../../assets/boost.png";
import lock from "../../assets/padlock.png";
import { ethers } from "ethers";

import plantsAbi from "../../contracts/plants_abi.json";
import fertAbi from "../../contracts/fert_abi.json";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";

const Greenhouse = ({
  sold,
  boosted,
  sellable,
  states,
  index,
  address,
  signer,
  currentBlock,
}) => {
  const { fertAdd, plantAdd } = useContext(AppContext);

  const [isSold, setSold] = useState(sold);
  const [isReady, setisReady] = useState(sellable);
  const [isBoosted, setisBoosted] = useState(boosted);

  const bigNumParser = (bigNum) => {
    return Number(ethers.utils.formatUnits(bigNum, 0));
  };

  // const creationBlock = states[0];

  // const delta = Number(currentBlock) - creationBlock;

  // const secondStage = bigNumParser(state[1]) + bigNumParser(state[2]);

  // const thirdtage =
  //   bigNumParser(state[1]) + bigNumParser(state[2]) + bigNumParser(state[3]);

  // const fourthStage =
  //   bigNumParser(state[1]) +
  //   bigNumParser(state[2]) +
  //   bigNumParser(state[3]) +
  //   bigNumParser(state[4]);

  const fetchUnitData = async () => {
    if (!sold) {
      const soldState = await plantContract.isGreenhouseSold(address, index);
      const isReady = await plantContract.getPlantsState(address, index);
      const boosted = await plantContract.isFertilized(address, index);

      setisReady(isReady);
      setisBoosted(boosted);
      setSold(soldState);
    }
  };

  useEffect(() => {
    if (!isSold) {
      setInterval(() => {
        fetchUnitData();
      }, 5000);
    }
  });

  const plantContract = new ethers.Contract(plantAdd, plantsAbi, signer);
  const fertContract = new ethers.Contract(fertAdd, fertAbi, signer);

  const sellPackage = async () => {
    const sellPack = await plantContract.sellPackage(address, index);

    await sellPack.wait();
    alert("Success!");
  };

  const boostUnit = async () => {
    const approve = await fertContract.approve(
      plantAdd,
      ethers.utils.parseEther("1")
    );
    await approve.wait();

    const boostUnits = await plantContract.addFertilizer(address, index);
    await boostUnits.wait();

    alert("Success!");
    fetchUnitData();
  };

  return (
    <div
      className={
        isBoosted
          ? "max-w-3xl relative border-[4px] border-[#000000] rounded-xl py-10 px-10 gap-2 flex-wrap bg-[#3af2f23f] w-full flex justify-center"
          : "max-w-3xl relative rounded-xl py-10 px-10 gap-2 flex-wrap bg-white w-full flex justify-center"
      }
    >
      {states?.map((item) => (
        <Plant
          boosted={isBoosted}
          state={item}
          currentBlock={currentBlock}
        />
      ))}

      {console.log(isSold, index)}
      <h2 className="text-2xl">{sold}</h2>

      {sold && (
        <div className="absolute flex justify-center items-center rounded-xl bg-[#000000ad] bottom-0 top-0 right-0 left-0">
          <div className="bg-[#1110] flex flex-col p-5">
            <img
              src={sell}
              alt=""
              className="w-44 h-44"
            />
            <h2 className="text-white mt-2">This Collection is Sold!</h2>
          </div>
        </div>
      )}

      {!sold && (
        <div className="absolute bottom-3 right-4 flex gap-1">
          {isBoosted ? (
            <div className="p-2 bg-[#f534b8fa] flex flex-col items-center rounded-xl w-16 h-16 border-[3px] border-black">
              <img
                src={boost}
                alt=""
                className="w-8 h-8"
              />
              <h2 className="text-white text-xs">Boosted!</h2>
            </div>
          ) : (
            <>
              {!isReady && (
                <button
                  onClick={boostUnit}
                  className="p-2 bg-[#37b2b6dc] rounded-xl w-16 h-16 border-[3px] border-black"
                >
                  <img
                    src={fert}
                    alt=""
                  />
                </button>
              )}
            </>
          )}

          <button
            onClick={sellPackage}
            disabled={!isReady}
            className="p-2 relative bg-[#3d3d3ddc] rounded-xl w-16 h-16 border-[3px] border-black"
          >
            <img
              src={sell}
              alt=""
            />
            {!isReady && (
              <img
                src={lock}
                alt=""
                className="absolute w-7 h-7 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Greenhouse;
