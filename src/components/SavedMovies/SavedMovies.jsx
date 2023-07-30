import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import deleteIcon from '../../images/delete-icon.svg'

function SavedMovies() {
    return (
    <section className="saved-movies">
        <SearchForm />
        <MoviesCardList
        icon={deleteIcon}
        />
    </section>
    );
}

export default SavedMovies;