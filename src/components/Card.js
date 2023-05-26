import React from "react";

export default function Card({ card, onCardClick}) {

    function handleClick() {
      onCardClick(card);
    };

  return (
    <li className="cards__item">
      <button 
      className="cards__trash-btn" 
      type="button" />
      <img className="cards__photo" 
      src={card.link} 
      alt={card.name}
      onClick={handleClick} />
      <div className="cards__caption">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards_like-container">
          <button className="cards__like" type="button" aria-label="Лайк" />
          <span className="cards__like_counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
