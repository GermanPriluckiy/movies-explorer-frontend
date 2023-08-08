import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";



function MoviesCardList( { icon, cards } ) {
  return (
    <div className="movies-list">
      {cards.map((cards) => {
        return (
          <MoviesCard
            image={cards.image}
            name={cards.nameRU}
            duration={cards.duration}
            icon={icon}
          />
        );
      })}
      
    </div>
  );
}

export default MoviesCardList;
