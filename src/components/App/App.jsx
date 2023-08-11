import React from "react";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Wrapper from "../Wrapper/Wrapper";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="page">
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
            <ProtectedRoute
              element={
                <Wrapper>
                  <Movies />
                </Wrapper>
              }
              loggedIn={loggedIn}
            />
          }
        />

        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute
              element={
                <Wrapper>
                  <SavedMovies />
                </Wrapper>
              }
              loggedIn={loggedIn}
            />
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute
            element={
              <Wrapper>
                <Profile />
              </Wrapper>
            }
            loggedIn={loggedIn}
          />
          }
        />

        <Route path="/signin" element={<Login />} />

        <Route path="/signup" element={<Register />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
