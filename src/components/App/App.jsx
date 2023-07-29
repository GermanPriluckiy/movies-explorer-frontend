import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Wrapper from "../Wrapper/Wrapper";
import SearchForm from "../SearchForm/SearchForm";

function App() {
  return (
    <body className="page">
      <Routes>
        <Route
          path="/"
          element={
            <Wrapper>
              <Main />
            </Wrapper>
          }
        />

<Route
          path="/movies"
          element={
            <Wrapper>
              <SearchForm />
            </Wrapper>
          }
        />

        <Route path="/signin" element={<Login />} />
        
        <Route path="/signup" element={<Register />} />
      </Routes>
    </body>
  );
}

export default App;
