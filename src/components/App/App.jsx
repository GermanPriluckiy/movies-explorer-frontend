import React, { useEffect, useState } from "react";
import { api } from "../../utils/MainApi";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { validateToken, exitAccount, login } from "../../utils/Auth";
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
  const [editMessage, setEditMessage] = useState("");
  const [isSuccessEditProfile, setIsSuccessEditProfile] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    navigate(JSON.parse(window.sessionStorage.getItem("lastRoute") || "{}"));
    window.onbeforeunload = () => {
      window.sessionStorage.setItem(
        "lastRoute",
        JSON.stringify(window.location.pathname)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEditMessage("");
    function checkToken() {
      validateToken()
        .then((user) => {
          setLoggedIn(true);
        })
        .catch((err) => console.log(err));
    }

    if (loggedIn) {
      api
        .getUserInfoFromServer()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => console.log(err));
    } else {
      checkToken();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true) {
      api
        .getSavedMovies()
        .then((res) => setSavedMovies(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function deleteEditMessage() {
    setEditMessage('');
  }


  //Логин
  function handleLogin(email, password) {
    login(email, password)
      .then((res) => {
        setLoggedIn(true);
        navigate("/movies");
        console.log(res);
      })
      .catch((err) => {
        if (err.includes("401")) {
          setLoginMessage("Неверная почта или пароль.");
        }
      });
  }

  //Сохранение фильма
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

  //Удаление фильма
  function handleDeleteMovie(deleteId) {
    api
      .deleteMovie(deleteId)
      .then((res) => {
        console.log("Фильм успешно удален");

        const newSavedMovie = savedMovies.filter(
          (movie) => movie._id !== deleteId
        );

        setSavedMovies(newSavedMovie);
      })
      .catch((err) => console.log(err));
  }

  //Обновление профиля
  function handleUpdateProfile(name, email) {
    api
      .setUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res.user);
        setIsSuccessEditProfile(true);
        setEditMessage("Данные профиля успешно изменены.");
      })
      .catch((err) => {
        setIsSuccessEditProfile(false);
        if (err.includes("409")) {
          setEditMessage("Пользователь с такой почтой уже существует");
        }
      });
  }

  //Выход из профиля
  function handleLogout() {
    localStorage.clear();
    setSavedMovies([]);
    exitAccount()
      .then(() => {
        setLoggedIn(false);
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
                    onDeleteMovie={handleDeleteMovie}
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
                children={
                  <SavedMovies
                    savedMovies={savedMovies}
                    onDeleteMovie={handleDeleteMovie}
                  />
                }
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Wrapper}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                children={
                  <Profile
                    onLogout={handleLogout}
                    editMessage={editMessage}
                    isSuccessEditProfile={isSuccessEditProfile}
                    handleUpdateProfile={handleUpdateProfile}
                    deleteEditMessage={deleteEditMessage}
                  />
                }
              />
            }
          />

          <Route
            path="/signin"
            element={
              <Login
                loggedIn={loggedIn}
                onLogin={handleLogin}
                loginMessage={loginMessage}
              />
            }
          />

          <Route path="/signup" element={<Register />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
