import React from 'react';
import './Card.css';

export const Card = ({favorite }) => {
  const { description, id, image, name, thumbnail } = favorite;
  
  return (
    <article className="Card">
      <div className="game-info" id="game-title">
        <h3>{ name }</h3>
        <img src={thumbnail} alt="game-icon"/>
      </div>
      <div className="game-info" id="game-description">
        <p>{ description }</p>
      </div>
      <div className="game-info" id="review-cont">
        <h3>4/5</h3>
        <p contenteditable="true">My criticism of the distribution notwithstanding, Arkham Horror the Card Games is everything I was hoping and expecting it would be. It really does capture that RPG-lite element of the original board game and makes a game that is even more narrative and thematic. </p>
      </div>
    </article>
  )
}