import seed from "../../../assets/seed.png";
import med from "../../../assets/med.png";
import plant from "../../../assets/succulent.png";
import grown from "../../../assets/orange-tree.png";
import { ethers } from "ethers";
import { useContext } from "react";
import { AppContext } from "../../../context/appContext";

const Plant = ({ state, currentBlock }) => {
  const bigNumParser = (bigNum) => {
    return Number(ethers.utils.formatUnits(bigNum, 0));
  };

  const creationBlock = state[0];

  const delta = Number(currentBlock) - creationBlock;

  const secondStage = bigNumParser(state[1]) + bigNumParser(state[2]);

  const thirdtage =
    bigNumParser(state[1]) + bigNumParser(state[2]) + bigNumParser(state[3]);

  const fourthStage =
    bigNumParser(state[1]) +
    bigNumParser(state[2]) +
    bigNumParser(state[3]) +
    bigNumParser(state[4]);

  return (
    <div className="bg-[#eaeaea] p-3 w-32 border rounded-xl flex justify-center items-center h-32">
      {delta >= fourthStage ? (
        <img
          src={grown}
          alt="plant"
        />
      ) : delta >= thirdtage ? (
        <img
          src={plant}
          alt="plant"
        />
      ) : delta >= secondStage ? (
        <img
          src={med}
          alt="plant"
        />
      ) : (
        <img
          src={seed}
          alt="plant"
        />
      )}
    </div>
  );
};

export default Plant;
