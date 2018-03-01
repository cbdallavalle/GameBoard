import React from 'react';
import Card from '../../containers/Card/Card';
import PropTypes from 'prop-types';

export const FriendsFavsContainer = ({favorites, type}) => {  
  const favoritesToRender = Object.keys(favorites).map( (key, index) => {
    return (
      <Card 
        key={ index }
        favorite={ favorites[key] }
        friendName={ key }
        type={ type }
      />
    );
  });

  return (
    <section className="CardContainer">
      { favoritesToRender }
    </section>
  );
};

FriendsFavsContainer.propTypes = {
  favorites: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired
};