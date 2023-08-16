import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { apiMovies } from "../../utils/MoviesApi.js";

function Movies() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isLowDuration, setIsLowDuration] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [countMovie, setCountMovie] = useState(2);

  useEffect(() => {
    !localStorage.getItem("movies")
      ? apiMovies
          .getMovies()
          .then((res) => {
            setAllMovies(res);
            setMovies(res.slice(0, 7));
          })
          .catch((err) => {
            console.log(err);
          })
      : setMovies(JSON.parse(localStorage.getItem("movies")));
  }, []);

  function showMoreMovies() {
    setMovies(allMovies.slice(0, 7 + countMovie));
    setCountMovie(countMovie + 2);
  }

  useEffect(() => {
    setKeyword(localStorage.getItem("keyword"));

    localStorage.getItem("isLowDuration") === "true"
      ? setIsLowDuration(true)
      : setIsLowDuration(false);
  }, []);

  function handleInputChange(e) {
    setKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword) {
      alert("Введите ключевое слово");
      return;
    }

    setIsLoading(true);
    setIsNotFound(false);

    apiMovies
      .getMovies()
      .then((res) => {
        const movies = res.filter(
          (movie) =>
            movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
            movie.nameRU.toLowerCase().includes(keyword.toLowerCase())
        );

        if (movies.length === 0) {
          setIsNotFound(true);
        }

        if (isLowDuration) {
          const result = movies.filter((item) => item.duration <= 40);
          localStorage.setItem("movies", JSON.stringify(result));
          localStorage.setItem("isLowDuration", isLowDuration);
          setMovies(result);
        } else {
          localStorage.setItem("movies", JSON.stringify(movies));
          localStorage.setItem("isLowDuration", isLowDuration);
          setMovies(movies);
        }

        localStorage.setItem("keyword", keyword);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCheckbox(e) {
    if (isLowDuration) {
      setIsLowDuration(false);
      setMovies(JSON.parse(localStorage.getItem("movies")));
    } else {
      setIsLowDuration(true);
      const lowDurationMovies = movies.filter((item) => item.duration <= 40);
      setMovies(lowDurationMovies);
    }
  }

  // useEffect(() => {
  //   const mov = JSON.parse(localStorage.getItem("movies"));
  //   setMovies(mov);
  // }, [setMovies]);

  return (
    <main className="movies">
      <SearchForm
        onChange={handleInputChange}
        handleCheckbox={handleCheckbox}
        keyword={keyword}
        onSubmit={handleSubmit}
        isLowDuration={isLowDuration}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList movies={movies} isNotFound={isNotFound} />
          {movies.length >= 7 && countMovie <= movies.length ? (
            <button className="movies__more" onClick={showMoreMovies}>
              Ещё
            </button>
          ) : (
            ""
          )}
        </>
      )}
    </main>
  );
}

export default Movies;
