import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import deleteIcon from "../../images/delete-icon.svg";
import { api } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies() {
  const currentUser = React.useContext(CurrentUserContext);

  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    api
      .getSavedMovies(currentUser._id)
      .then((res) => setSavedMovies(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser._id]);
  return (
    <main className="saved-movies">
      <SearchForm />
      <MoviesCardList icon={deleteIcon} movies={savedMovies} />
    </main>
  );
}

export default SavedMovies;
