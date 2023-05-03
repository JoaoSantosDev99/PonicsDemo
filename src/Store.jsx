import tree from "./assets/seed.png";
import fert from "./assets/fertilizer.png";
import { useState } from "react";
import { Link } from "react-router-dom";

import tokenImg from "./assets/token.png";
import fertImg from "./assets/fertilizer.png";
import treeImg from "./assets/succulent.png";

const Store = () => {
  const [fertAmount, setFertAmount] = useState(1);

  const incrementInput = () => {
    setFertAmount((prevState) => prevState + 1);
  };

  const decrementInput = () => {
    if (fertAmount === 1) return;
    setFertAmount((prevState) => prevState - 1);
  };
  // const [checked, setChecked] = useState(false);
  // const [valid, setValid] = useState(false);
  // const [inputAddress, setInputAddress] = useState("");

  // const checkAddress = () => {
  //   setChecked(true);
  //   setValid(whiteList.includes(inputAddress.toLocaleLowerCase()));
  //   setInputAddress("");
  // };

  // const handleInputChange = (e) => {
  //   setInputAddress(e.target.value);
  // };

  return (
    <section className="w-full mb-10 flex justify-center items-center px-2">
      <div className="max-w-screen-xl justify-center w-full border-black mt-52 p-10 gap-10 flex items-center flex-col">
        <div className="flex gap-5">
          {/* Tree */}
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
            <button className="p-4 bg-[#92f73a] text-xl rounded-xl">
              Buys 10 Seeds
            </button>
          </div>
          {/* fert */}
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
            <button className="p-4 mt-3 bg-[#f7993a] text-xl rounded-xl">
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

export default Store;
