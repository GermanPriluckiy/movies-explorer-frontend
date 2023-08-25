import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({
  movies,
  isNotFound,
  savedMovies,
  handleButtonClick,
  onDeleteMovie,
}) {
  const location = useLocation();

  return (
    <div className="movies-list">
      {isNotFound ? (
        <p style={{ color: "red" }}>Поиск не дал результатов</p>
      ) : (
        movies.map((movie) => {
          return (
            <MoviesCard
              key={location.pathname === "/movies" ? movie.id : movie.movieId}
              country={movie.country}
              director={movie.director}
              duration={movie.duration}
              year={movie.year}
              description={movie.description}
              image={
                location.pathname === "/movies"
                  ? `https://api.nomoreparties.co${movie.image.url}`
                  : movie.image
              }
              thumbnail={
                location.pathname === "/movies"
                  ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
                  : movie.thumbnail
              }
              trailerLink={movie.trailerLink}
              movie_id={location.pathname === "/saved-movies" ? movie._id : ""}
              movieId={movie.id}
              nameRU={movie.nameRU}
              nameEN={movie.nameEN}
              savedMovies={savedMovies}
              handleButtonClick={handleButtonClick}
              onDeleteMovie={onDeleteMovie}
            />
          );
        })
      )}
    </div>
  );
}

export default MoviesCardList;
