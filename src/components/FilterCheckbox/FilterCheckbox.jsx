import React from "react";

function FilterCheckbox() {
  return (
    <div className="filter">
      <span className="filter__text">Короткометражки</span>

      <label className="filter__switch">
        <input className="filter__input" type="checkbox"></input>
        <span className="filter__slider"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
