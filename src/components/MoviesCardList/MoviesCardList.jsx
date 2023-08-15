import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ movies, isNotFound }) {
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
              image={`https://api.nomoreparties.co${movie.image.url}`}
              trailerLink={movie.trailerLink}
              thumbnail={`https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`}
              movieId={movie.id}
              nameRU={movie.nameRU}
              nameEN={movie.nameEN}
              key={movie.id}
            />
          );
        })
      )}
    </div>
  );
}

export default MoviesCardList;
