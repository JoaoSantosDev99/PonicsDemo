import { ethers } from "ethers";
import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const tokenAdd = "0x0Cd3E4c482eDd23F42505ed2b788BB74cEd9A8dd";
  const fertAdd = "0x09D417Bc2551159A85091B4f832f5d7DD47515B5";
  const plantAdd = "0xF909a4B7aFD1497C36f9959e59E4bce5fAe5A3A0";

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
