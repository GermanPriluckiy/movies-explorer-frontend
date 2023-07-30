import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Wrapper({ children }) {
  return (
    <>
      <Header />
      {children}
      {window.location.pathname === "/profile" ? "" : <Footer />}
    </>
  );
}

export default Wrapper;
