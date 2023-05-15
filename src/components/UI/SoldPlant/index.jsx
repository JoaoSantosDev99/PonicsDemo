import grown from "../../../assets/orange-tree.png";

const SoldPlant = () => {
  return (
    <div className="bg-[#eaeaea] p-3 w-28 h-28 border rounded-xl flex justify-center items-center">
      <img
        src={grown}
        alt="plant"
      />
    </div>
  );
};

export default SoldPlant;
