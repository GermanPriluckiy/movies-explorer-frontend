import React from "react";
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
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
        })
        .catch((err) => console.log(err));
    } else {
      checkToken();
    }
  }, [loggedIn, navigate]);

  //Обновление профиля
  function updateProfile(name, email) {
    return api.setUserInfo(name, email).then((newInfo) => {
      setCurrentUser(newInfo);
    });
  }

  //Выход из профиля
  function handleLogout() {
    exitAccount()
      .then(() => setLoggedIn(false))
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
                children={<Movies />}
              />
            }
          />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={Wrapper}
                loggedIn={loggedIn}
                children={<SavedMovies />}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Wrapper}
                loggedIn={loggedIn}
                children={
                  <Profile onLogout={handleLogout} onUpdate={updateProfile} />
                }
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
