import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Store from "./Store";
import Home from "./Home";

function App() {
  // const [backTop, setBackTop] = useState(false);

  // useEffect(() => {
  //   const handleShadow = () => {
  //     if (window.scrollY >= 1200) {
  //       setBackTop(true);
  //     } else {
  //       setBackTop(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleShadow);
  // }, []);

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0 });
  // };

  return (
    <React.Fragment>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/store"
            element={<Store />}
          />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
