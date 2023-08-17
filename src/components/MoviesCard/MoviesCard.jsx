import React from "react";
import { useLocation } from "react-router-dom";

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
}) {
  const location = useLocation();

  const isMovieSaved = savedMovies.some((item) => item.movieId === movieId);

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


  function showId() {
    console.log(movie_id);
  }

  return (
    <div className="movies-card">
      <div className="movies-card__info">
        <div>
          <p className="movies-card__name" onClick={showId}>
            {nameRU}
          </p>
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
          onClick={onButtonClick}
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
