import Plant from "../UI/Plant";
import fert from "../../assets/fertilizer.png";
import sell from "../../assets/box.png";
import boost from "../../assets/boost.png";
import lock from "../../assets/padlock.png";

const Greenhouse = ({ sold, boosted, sellable }) => {
  return (
    <div
      className={
        boosted
          ? "max-w-3xl relative border-[4px] border-[#000000] rounded-xl py-10 px-10 gap-2 flex-wrap bg-[#3af2f23f] w-full flex justify-center"
          : "max-w-3xl relative rounded-xl py-10 px-10 gap-2 flex-wrap bg-white w-full flex justify-center"
      }
    >
      <Plant />
      <Plant />
      <Plant />
      <Plant />
      <Plant />
      <Plant />
      <Plant />
      <Plant />
      <Plant />
      <Plant />

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
          {boosted ? (
            <div className="p-2 bg-[#f534b8fa] flex flex-col items-center rounded-xl w-16 h-16 border-[3px] border-black">
              <img
                src={boost}
                alt=""
                className="w-8 h-8"
              />
              <h2 className="text-white text-xs">Boosted!</h2>
            </div>
          ) : (
            <button className="p-2 bg-[#37b2b6dc] rounded-xl w-16 h-16 border-[3px] border-black">
              <img
                src={fert}
                alt=""
              />
            </button>
          )}

          <button
            disabled={!sellable}
            className="p-2 relative bg-[#3d3d3ddc] rounded-xl w-16 h-16 border-[3px] border-black"
          >
            <img
              src={sell}
              alt=""
            />
            {!sellable && (
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
