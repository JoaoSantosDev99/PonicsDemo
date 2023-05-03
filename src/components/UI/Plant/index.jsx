import plant from "../../../assets/seed.png";

const Plant = () => {
  return (
    <div className="bg-[#eaeaea] p-3 w-32 border rounded-xl flex justify-center items-center h-32">
      <img
        src={plant}
        alt="plant"
      />
    </div>
  );
};

export default Plant;
