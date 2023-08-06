import React from "react";


function MoviesCard( { name, duration, image, icon } ) {
    return (
        <div className="movies-card">
            <div className="movies-card__info">
                <div>
                <p className="movies-card__name">{name}</p>
                <p className="movies-card__duration">{duration}</p>
                </div>
                <img className="movies-card__save" src={icon} alt="Сохранить в коллекцию"></img>
            </div>
            <img className="movies-card__image" src={image} alt="Изображение фильма"></img>
        </div>
    );
}

export default MoviesCard;