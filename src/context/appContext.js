import { ethers } from "ethers";
import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const tokenAdd = "0x0Cd3E4c482eDd23F42505ed2b788BB74cEd9A8dd";
  const fertAdd = "0x09D417Bc2551159A85091B4f832f5d7DD47515B5";
  const plantAdd = "0x79766257C0af67f6DBf82335549B391F61b370f6";

  return (
    <AppContext.Provider
      value={{
        tokenAdd,
        fertAdd,
        plantAdd,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
