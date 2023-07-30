import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import cards from "../../utils/constants";


function MoviesCardList( { icon } ) {
  return (
    <div className="movies-list">
      {cards.map((card) => {
        return (
          <MoviesCard
            image={card.image}
            name={card.nameRU}
            duration={card.duration}
            icon={icon}
          />
        );
      })}
    </div>
  );
}

export default MoviesCardList;
