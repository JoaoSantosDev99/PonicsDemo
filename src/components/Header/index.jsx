import { useWeb3Modal } from "@web3modal/react";
import { Link, NavLink } from "react-router-dom";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { addressShortener, longAddress } from "../../utils";
import buy from "../../assets/buy.png";

const Header = () => {
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const { address, isConnected } = useAccount();

  const connectWallet = () => {
    if (chain?.id !== 1) {
      switchNetwork?.(1);
    }
    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-full flex justify-center pt-1 px-1">
      <div className="max-w-screen-2xl items-center flex justify-between w-full p-2 rounded-xl">
        <h1 className="bg-white p-2 w-[150px] rounded-md text-xl text-center">
          Logo
        </h1>
        <div className="flex gap-2 justify-center md:justify-between items-center">
          <Link to="/store">
            <button className="flex items-center gap-2 bg-[#00a5d3] border-[3px] border-[#ffffff] p-2 rounded-lg">
              <img
                src={buy}
                alt=""
                className="w-8 h-8"
              />
              <h2 className="text-lg text-white">Store</h2>
            </button>
          </Link>

          {isConnected ? (
            <div>
              <button className="hidden md:flex bg-[#FC598E] border-[3px] border-[#4f4f4f] p-3 rounded-lg">
                {addressShortener(address)}
              </button>
              <button className="flex md:hidden bg-[#FC598E] border-[3px] border-[#4f4f4f] p-3 rounded-lg">
                {longAddress(address)}
              </button>
            </div>
          ) : (
            <div>
              <div className="hidden md:flex">
                <button
                  className="bg-[#FC598E] border-[3px] border-[#4f4f4f] p-3 rounded-lg"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              </div>
              <div className="md:hidden">
                <button
                  className="bg-[#FC598E] border-2 border-[#4f4f4f] p-3 rounded-lg"
                  onClick={connectWallet}
                >
                  Connect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
