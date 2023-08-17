import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import deleteIcon from "../../images/delete-icon.svg";
import { api } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies() {
  const currentUser = React.useContext(CurrentUserContext);
  const [savedMovies, setSavedMovies] = useState([]);
  const [shownMovies, setShownMovies] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLowDuration, setIsLowDuration] = useState(false);

  useEffect(() => {
    api
      .getSavedMovies(currentUser._id)
      .then((res) => {
        setSavedMovies(res.data);
        setShownMovies(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser._id]);

  function handleInputChange(e) {
    setKeyword(e.target.value);
    console.log(keyword);
  }

  function handleCheckbox(e) {
    if (isLowDuration) {
      setIsLowDuration(false);
      setShownMovies(savedMovies);
    } else {
      setIsLowDuration(true);
      const lowDurationMovies = savedMovies.filter(
        (item) => item.duration <= 40
      );
      setShownMovies(lowDurationMovies);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword) {
      alert("Введите ключевое слово");
      return;
    }
    const movies = savedMovies.filter(
      (movie) =>
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
    );
    setSavedMovies(movies);
    if (isLowDuration) {
      const result = savedMovies.filter((item) => item.duration <= 40);

      setShownMovies(result);
    } else {
      setShownMovies(movies);
    }
  }

  return (
    <main className="saved-movies">
      <SearchForm
        onChange={handleInputChange}
        keyword={keyword}
        handleCheckbox={handleCheckbox}
        onSubmit={handleSubmit}
        isLowDuration={isLowDuration}
      />
      <MoviesCardList icon={deleteIcon} movies={shownMovies} />
    </main>
  );
}

export default SavedMovies;
