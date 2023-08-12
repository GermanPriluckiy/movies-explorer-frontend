import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Wrapper({ children, loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      {children} 
      {window.location.pathname === "/profile" ? "" : <Footer />}
    </>
  );
}

export default Wrapper;
