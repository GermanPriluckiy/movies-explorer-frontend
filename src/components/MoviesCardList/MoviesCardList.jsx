import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";

function MoviesCardList({ movies, isNotFound, savedMovies, handleButtonClick }) {
  const location = useLocation();

  // movies.map((movie) => {
  //  return movie.id = savedMovies.find(savedMovie => savedMovie.id === movie.id);
  // });


  return (

    <div className="movies-list">
      {isNotFound ? (
        <p style={{ color: "red" }}>Поиск не дал результатов</p>
      ) : (
        movies.map((movie) => {
          
          return (
            <MoviesCard
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
              // movie_id={
              //   location.pathname === "/saved-movies"
              //     ? movie._id
              //     : movie.id
              // }
              movieId={movie.id}
              nameRU={movie.nameRU}
              nameEN={movie.nameEN}
              key={movie.id}
              savedMovies={savedMovies}
              handleButtonClick={handleButtonClick}
            />
          );
        })
      )}
    </div>
  );
}

export default MoviesCardList;
