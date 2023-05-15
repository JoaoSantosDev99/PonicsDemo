import grown from "../../assets/orange-tree.png";
import sell from "../../assets/box.png";
import SoldPlant from "../UI/SoldPlant";

const SoldGreenhouse = () => {
  return (
    <div
      className={
        "max-w-2xl relative rounded-xl py-10 px-10 gap-2 flex-wrap bg-white w-full flex justify-center"
      }
    >
      <SoldPlant />
      <SoldPlant />
      <SoldPlant />
      <SoldPlant />
      <SoldPlant />
      <SoldPlant />
      <SoldPlant />
      <SoldPlant />
      <SoldPlant />
      <SoldPlant />

      <div className="absolute flex justify-center items-center rounded-xl bg-[#000000ad] bottom-0 top-0 right-0 left-0">
        <div className="bg-[#1110] flex flex-col items-center p-5">
          <img
            src={sell}
            alt=""
            className="w-32 h-32"
          />
          <h2 className="text-white mt-2">This Collection is Sold!</h2>
        </div>
      </div>
    </div>
  );
};

export default SoldGreenhouse;
