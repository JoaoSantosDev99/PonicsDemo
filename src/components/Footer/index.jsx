import email from "../../assets/Icons/email.png";
import facebook from "../../assets/Icons/facebook.png";
import twitter from "../../assets/Icons/twitter.png";

const Footer = () => {
  return (
    <footer className="w-full p-4 flex justify-center">
      <div className="flex flex-col py-3 items-center bg-white rounded-lg border-[#111] border-2 px-5">
        <h2 className="text-2xl mb-2">Contact us at:</h2>
        <ul className="flex gap-4">
          <li>
            <img
              src={email}
              alt="email"
            />
          </li>
          <li>
            <img
              src={facebook}
              alt="facebook"
            />
          </li>
          <li>
            <img
              src={twitter}
              alt="twitter"
            />
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
