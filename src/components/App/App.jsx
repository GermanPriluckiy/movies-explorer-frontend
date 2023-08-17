import React, { useEffect, useState } from "react";
import { api } from "../../utils/MainApi";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { validateToken, exitAccount } from "../../utils/Auth";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Wrapper from "../Wrapper/Wrapper";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    function checkToken() {
      validateToken()
        .then((user) => {
          setLoggedIn(true);

          navigate("/movies", { replace: true });
        })
        .catch((err) => console.log(err));
    }

    if (loggedIn) {
      api
        .getUserInfoFromServer()
        .then((userInfo) => {
          setCurrentUser(userInfo);
          // setSavedMovies(savedMovies.data);
        })
        .catch((err) => console.log(err));
    } else {
      checkToken();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  useEffect(() => {
    api
      .getSavedMovies()
      .then((res) => setSavedMovies(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleButtonClick(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  ) {
    api
      .saveNewMovie(
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN
      )
      .then((movie) => {
        console.log("Фильм успешно сохранён");

        setSavedMovies([...savedMovies, movie.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Выход из профиля
  function handleLogout() {
    exitAccount()
      .then(() => {
        setLoggedIn(false);
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Wrapper loggedIn={loggedIn}>
                <Main />
              </Wrapper>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Wrapper}
                loggedIn={loggedIn}
                children={
                  <Movies
                    savedMovies={savedMovies}
                    handleButtonClick={handleButtonClick}
                  />
                }
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={Wrapper}
                loggedIn={loggedIn}
                children={<SavedMovies savedMovies={savedMovies} />}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Wrapper}
                loggedIn={loggedIn}
                children={<Profile onLogout={handleLogout} />}
              />
            }
          />

          <Route path="/signin" element={<Login loggedIn={loggedIn} />} />

          <Route path="/signup" element={<Register />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
