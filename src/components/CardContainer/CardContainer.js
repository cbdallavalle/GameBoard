import React from 'react';
import Card from '../Card/Card';
import './CardContainer.css';

export const CardContainer = ({favorites, type}) => {
  const favoritesToRender = Object.keys(favorites).map( (key, index) => {
    return (
      <Card 
        key={ index }
        favorite={ favorites[key] }
        friendName={ key }
        type={ type }
      />
    )
  })

  return (
    <section className="CardContainer">
      { favoritesToRender }
    </section>
  )
}