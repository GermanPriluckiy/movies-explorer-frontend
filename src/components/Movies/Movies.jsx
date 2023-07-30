import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import saveIcon from "../../images/save-icon.svg";

function Movies() {
    return (
    <section className="movies">
        <SearchForm />
        <MoviesCardList 
        icon={saveIcon}
        />
    </section>
    );
}

export default Movies;