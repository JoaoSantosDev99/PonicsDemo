import { ethers } from "ethers";
import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const tokenAdd = "0x0Cd3E4c482eDd23F42505ed2b788BB74cEd9A8dd";
  const fertAdd = "0x09D417Bc2551159A85091B4f832f5d7DD47515B5";
  const plantAdd = "0x0ec77A68958bBD3A7a740337Bf5Ae26Be9D58BAe";

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/polygon_mumbai"
  );

  const [isLoading, setisLoading] = useState(false);

  return (
    <AppContext.Provider
      value={{
        tokenAdd,
        fertAdd,
        plantAdd,
        isLoading,
        setisLoading,
        staticProvider,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
