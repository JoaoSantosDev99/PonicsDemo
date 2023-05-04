import seed from "../../../assets/seed.png";
import med from "../../../assets/med.png";
import plant from "../../../assets/succulent.png";
import grown from "../../../assets/orange-tree.png";

const Plant = ({ state }) => {
  return (
    <div className="bg-[#eaeaea] p-3 w-32 border rounded-xl flex justify-center items-center h-32">
      {state === "First" ? (
        <img
          src={seed}
          alt="plant"
        />
      ) : state === "Second" ? (
        <img
          src={med}
          alt="plant"
        />
      ) : state === "Third" ? (
        <img
          src={plant}
          alt="plant"
        />
      ) : (
        <img
          src={grown}
          alt="plant"
        />
      )}
    </div>
  );
};

export default Plant;
