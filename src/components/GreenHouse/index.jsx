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
  boosted,
  sellable,
  state,
  index,
  address,
  signer,
  currentBlock,
}) => {
  const { fertAdd, plantAdd, setisLoading } = useContext(AppContext);

  const [isReady, setisReady] = useState(sellable);
  const [isBoosted, setisBoosted] = useState(boosted);

  const fetchUnitData = async () => {
    const isReady = await plantContract.getPlantsState(address, index);
    const boosted = await plantContract.isFertilized(address, index);

    setisReady(isReady);
    setisBoosted(boosted);
  };

  useEffect(() => {
    setInterval(() => {
      fetchUnitData();
    }, 10000);
  });

  const plantContract = new ethers.Contract(plantAdd, plantsAbi, signer);
  const fertContract = new ethers.Contract(fertAdd, fertAbi, signer);

  const sellPackage = async () => {
    try {
      setisLoading(true);
      const sellPack = await plantContract.sellPackage(address, index);

      await sellPack.wait();
      setisLoading(false);
      fetchUnitData();
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const boostUnit = async () => {
    setisLoading(true);
    const approve = await fertContract.approve(
      plantAdd,
      ethers.utils.parseEther("1")
    );
    await approve.wait();

    const boostUnits = await plantContract.addFertilizer(address, index);
    await boostUnits.wait();

    setisLoading(false);

    alert("Success!");
    fetchUnitData();
  };

  return (
    <div
      className={
        isBoosted
          ? "max-w-lg relative rounded-xl py-5 px-5 gap-2 flex-wrap bg-[#3af2f23f] w-full flex justify-center"
          : "max-w-lg relative rounded-xl py-5 px-5 gap-2 flex-wrap bg-white w-full flex justify-center"
      }
    >
      {state?.map((item) => (
        <Plant
          boosted={isBoosted}
          state={item}
          currentBlock={currentBlock}
        />
      ))}

      <div className="absolute bottom-3 right-4 flex gap-1">
        {isBoosted ? (
          <div className="p-2 bg-[#f534b8fa] flex flex-col items-center rounded-md w-10 h-10 border-[2px] border-black">
            <img
              src={boost}
              alt=""
              className="w-6 h-8"
            />
          </div>
        ) : (
          <>
            {!isReady && (
              <button
                onClick={boostUnit}
                className="p-2 bg-[#37b2b6dc] rounded-xl w-8 h-8 border-[3px] border-black"
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
          className="flex items-center justify-center relative bg-[#3d3d3ddc] rounded-lg w-10 h-10 border-[2px] border-black"
        >
          <img
            src={sell}
            alt=""
            className="w-6 h-6"
          />
          {!isReady && (
            <img
              src={lock}
              alt=""
              className="absolute w-4 h-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Greenhouse;
