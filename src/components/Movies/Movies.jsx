import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

useEffect(() => {
  const mov = JSON.parse(localStorage.getItem('movies'));
  setMovies(mov);
}, []);

  return (
    <main className="movies">
      <SearchForm
        setMovies={setMovies}
        movies={movies}
        setIsLoading={setIsLoading}
        setIsNotFound={setIsNotFound}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList movies={movies} isNotFound={isNotFound}/>
          {movies.length <= 7 ? (
            ""
          ) : (
            <button className="movies__more">Ещё</button>
          )}
        </>
      )}
    </main>
  );
}

export default Movies;
