import React from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../utils/MainApi";

function MoviesCard({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  thumbnail,
  movie_id,
  movieId,
  nameRU,
  nameEN,
  savedMovies,
  handleButtonClick,
  setSavedMovies,
}) {
  const location = useLocation();

  const isMovieSaved = savedMovies.some((item) => item.movieId === movieId);
  const movieIdSeartch = savedMovies.find((item) => item.movieId === movieId);
  const hexId = movieIdSeartch ? movieIdSeartch._id : "id нет";

  function convToHours(duration) {
    const hours = Math.floor(duration / 60);
    const min = duration - hours * 60;
    if (duration < 60) {
      return `0ч ${duration}м`;
    }

    return `${hours}ч ${min}м`;
  }

  function onButtonClick() {
    handleButtonClick(
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
    );
  }

  function onDeleteMovie() {
    const deleteId = location.pathname === "/movies" ? hexId : movie_id;
    api
      .deleteMovie(deleteId)
      .then((res) => {
        console.log("Фильм успешно удален");
        const deletedMovieIndex = savedMovies.findIndex(
          (item) => item._id === deleteId
        );
        const newSavedMovie = savedMovies.filter(
          (movie) => movie._id !== deleteId
        );

        setSavedMovies(newSavedMovie);

        console.log(deletedMovieIndex);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="movies-card">
      <div className="movies-card__info">
        <div>
          <p className="movies-card__name">{nameRU}</p>
          <p className="movies-card__duration">{convToHours(duration)}</p>
        </div>
        <button
          className={
            location.pathname === "/movies"
              ? isMovieSaved
                ? "movies-card__save movies-card__save_active"
                : "movies-card__save"
              : "movies-card__delete"
          }
          type="button"
          onClick={
            location.pathname === "/movies"
              ? isMovieSaved
                ? onDeleteMovie
                : onButtonClick
              : onDeleteMovie
          }
        />
      </div>
      <a
        className="movies-card__link"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={image}
          alt="Изображение фильма"
        />
      </a>
    </div>
  );
}

export default MoviesCard;
