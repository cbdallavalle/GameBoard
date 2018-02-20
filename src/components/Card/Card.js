import React, { Component } from 'react';
import './Card.css';

export class Card extends Component {
  constructor() {
    super();
    this.state = {
      contenteditable: "false"
    }
  }

  componentDidMount = () => {
    this.props.type === 'games' && this.setState({contenteditable: "true"})
  }

  friendsName = () => {
    return this.props.type === 'friends' ? this.props.friendName + " played:" : null
  }

  render() {
    const { description, id, image, name, thumbnail } = this.props.favorite;
    return (
      <article className="Card">
        <div className="game-info" id="game-title">
          <h3>{ this.friendsName() }</h3>
          <h3>{ name }</h3>
          <img src={thumbnail} alt="game-icon"/>
        </div>
        <div className="game-info" id="game-description">
          <p>{ description }</p>
        </div>
        <div className={`game-info ${this.props.display}`} id="review-cont">
          <h3><span>0</span>/5</h3>
          <p contenteditable={this.state.contenteditable}>My criticism of the distribution notwithstanding, Arkham Horror the Card Games is everything I was hoping and expecting it would be. It really does capture that RPG-lite element of the original board game and makes a game that is even more narrative and thematic. </p>
        </div>
      </article>
    ) 
  }
}