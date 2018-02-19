import React from 'react';
import { Card } from '../Card/Card';
import './CardContainer.css';

export const CardContainer = (props) => {
  const favoritesToRender = Object.keys(props.favorites).map( (key, index) => {
    return (
      <Card 
        key={ index }
        favorite={ props.favorites[key] }
      />
    )
  })

  return (
    <section className="CardContainer">
      { favoritesToRender }
    </section>
  )
}