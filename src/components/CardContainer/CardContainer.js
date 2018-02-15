import React from 'react';
import { Card } from '../Card/Card';
import './CardContainer.css';

export const CardContainer = () => {
  return (
    <section className="CardContainer">
      <Card />
      <Card />
      <Card />
    </section>
  )
}