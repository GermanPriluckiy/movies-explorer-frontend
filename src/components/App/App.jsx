import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Wrapper from "../Wrapper/Wrapper";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

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
              <Movies />
            </Wrapper>
          }
        />

        <Route
          path="/saved-movies"
          element={
            <Wrapper>
              <SavedMovies />
            </Wrapper>
          }
        />

        <Route
          path="/profile"
          element={
            <Wrapper>
              <Profile />
            </Wrapper>
          }
        />

        <Route path="/signin" element={<Login />} />

        <Route path="/signup" element={<Register />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </body>
  );
}

export default App;
