import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import saveIcon from "../../images/save-icon.svg";
import { cards } from "../../utils/constants";

function Movies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList icon={saveIcon} cards={cards} />
      <button className="movies__more">Ещё</button>
    </main>
  );
}

export default Movies;
