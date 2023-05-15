import grown from "../../../assets/orange-tree.png";

const SoldPlant = () => {
  return (
    <div className="bg-[#eaeaea] p-3 w-20 h-20 border rounded-xl flex justify-center items-center">
      <img
        src={grown}
        alt="plant"
      />
    </div>
  );
};

export default SoldPlant;
