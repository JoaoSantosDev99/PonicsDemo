import seed from "../../../assets/seed.png";
import med from "../../../assets/med.png";
import med2 from "../../../assets/med2.png";
import plant from "../../../assets/succulent.png";
import grown from "../../../assets/orange-tree.png";

import { ethers } from "ethers";

const Plant = ({ state, currentBlock, boosted }) => {
  const bigNumParser = (bigNum) => {
    return Number(ethers.utils.formatUnits(bigNum, 0));
  };

  const creationBlock = state[0];

  const delta = Number(currentBlock) - creationBlock;

  const rawFirstStage = bigNumParser(state[1]);
  const rawSecondStage = rawFirstStage + bigNumParser(state[2]);
  const rawThirdStage = rawSecondStage + bigNumParser(state[3]);
  const rawFourthStage = rawThirdStage + bigNumParser(state[4]);

  const fourthStage = boosted ? rawFourthStage / 2 : rawFourthStage;
  const thirdStage = boosted ? rawThirdStage / 2 : rawThirdStage;
  const secondStage = boosted ? rawSecondStage / 2 : rawSecondStage;
  const firstStage = boosted ? rawFirstStage / 2 : rawFirstStage;

  return (
    <div className="bg-[#eaeaea] p-3 w-20 h-20 border rounded-xl flex justify-center items-center">
      {delta >= fourthStage ? (
        <img
          src={grown}
          alt="plant"
        />
      ) : delta >= thirdStage ? (
        <img
          src={plant}
          alt="plant"
        />
      ) : delta >= secondStage ? (
        <img
          src={med2}
          alt="plant"
        />
      ) : delta >= firstStage ? (
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
