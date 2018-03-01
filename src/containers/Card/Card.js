import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../assets/error.svg';
import addIcon from '../../assets/plus.svg';
import editIcon from '../../assets/pencil.svg';
import check from '../../assets/success.svg';
import negative from '../../assets/negative.svg';
import { updateFavorites } from '../../actions';
import { Link, Route } from 'react-router-dom';
import EditGame from '../../components/EditGame/EditGame';

import { connect } from 'react-redux';
import { db } from '../../firebase';
import './Card.css';

export class Card extends Component {
  constructor() {
    super();
    this.state = {
      error: '',
      edit: false,
      review: {}
    };
  }

  componentDidMount = () => {
    this.getGameReview();
  }

  friendsName = () => {
    return this.props.type === 'friends' 
      ? this.props.friendName + ' played:' 
      : null;
  }

  handleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

  handleAdd = async () => {
    try {
      await db.doAddFavoriteData(this.props.user.uid, this.props.favorite);
      const favorites = await db.getFavorites(this.props.user.uid);
      this.props.updateFavorites(favorites);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  getGameReview = async() => {
    try {
      const review = await db.doGetReviewData(this.props.user.uid, this.props.favorite.name);
      review && this.setState({ review });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  determineOwned = () => {
    return this.state.review.owned === 'yes' 
    ? <p id="owned-p">owned <i class="far fa-check-circle"></i></p>
    : <p id="owned-p">played <i class="far fa-play-circle"></i></p>
  }

  determineDisplay = () => {
    const { description, name, thumbnail } = this.props.favorite;
    const { rating, review, timesPlayed } = this.state.review;

    return !this.state.edit ?
    <article className={`Card ${this.props.type}`}>
        <div className="game-info" id="game-title">
          <h3>{ this.friendsName() }</h3>
          <h3>{ name }</h3>
          <img src={ thumbnail } alt="game-icon" />
          { this.determineOwned() }
          <div
            id="edit"
            alt="edit a game in your collection"
            onClick={this.handleEdit}
          >
          </div>
          <div
            id="add"
            alt="edit a game in your collection"
            onClick={this.handleAdd} 
          >
          </div>
        </div>
        <div className="game-info" id="game-description">
          <p>{ description }</p>
        </div>
        <div className={`game-info`} id="review-cont">
          <h3><span>{rating}</span>/5</h3>
          <p>
            { review } 
          </p>
        </div>
      </article>
      :
      <EditGame favorite={this.props.favorite} handleEdit={this.handleEdit} />
  }

  render() {
    return (
      <div>
      { this.determineDisplay() }
      </div>
    ); 
  }
}

Card.propTypes = {
  user: PropTypes.object.isRequired,
  favorite: PropTypes.object.isRequired,
  friendName: PropTypes.string,
  type: PropTypes.string,
  display: PropTypes.string,
  updateFavorites: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  updateFavorites: favorites => dispatch(updateFavorites(favorites))
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);