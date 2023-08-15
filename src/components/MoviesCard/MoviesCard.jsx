import React from "react";
import { api } from "../../utils/MainApi";

function MoviesCard({
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
  nameEN,
  
}) {

  function convToHours(duration) {
    const hours = Math.floor(duration / 60);
    const min = duration - hours * 60;
    if (duration < 60) {
      return `0ч ${duration}м`;
    }

    return `${hours}ч ${min}м`;
  }

  function handleLikeClick() {
    api.saveNewMovie( country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,).then((res) => {
        console.log('Фильм успешно сохранён');
      }).catch((err) => {
        console.log(err);
      })
      
  }

  return (
    <div className="movies-card">
      <div className="movies-card__info">
        <div>
          <p className="movies-card__name">{nameRU}</p>
          <p className="movies-card__duration">{convToHours(duration)}</p>
        </div>
        <button className="movies-card__save" type="button" onClick={handleLikeClick}/>
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
