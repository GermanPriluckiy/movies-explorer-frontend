import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import deleteIcon from '../../images/delete-icon.svg'
import { savedCards } from "../../utils/constants";

function SavedMovies() {
    return (
    <section className="saved-movies">
        <SearchForm />
        <MoviesCardList
        icon={deleteIcon}
        cards={savedCards}
        />
    </section>
    );
}

export default SavedMovies;