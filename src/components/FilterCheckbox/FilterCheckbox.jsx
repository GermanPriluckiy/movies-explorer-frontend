import React from "react";

function FilterCheckbox() {
  return (
    <div className="filter">
      <span className="filter__text">Короткометражки</span>

      <label class="filter__switch">
        <input className="filter__input" type="checkbox"></input>
        <span class="filter__slider"></span>
      </label>
    </div>
  );
}

export default FilterCheckbox;
