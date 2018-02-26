import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../assets/error.svg';
import addIcon from '../../assets/plus.svg';
import { updateFavorites } from '../../actions';

import { connect } from 'react-redux';
import { db } from '../../firebase';
import './Card.css';

export class Card extends Component {
  constructor() {
    super();
    this.state = {
      contenteditable: 'false',
      error: ''
    };
  }

  componentDidMount = async () => {
    this.props.type === 'games' && 
    await this.setState({contenteditable: 'true'});
  }

  friendsName = () => {
    return this.props.type === 'friends' 
      ? this.props.friendName + ' played:' 
      : null;
  }

  handleBlur = (event) => {
    try {
      db.doWriteReviewData(
        this.props.user.uid, 
        this.props.favorite, 
        event.target.innerHTML
      );
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  handleDelete = async () => {
    try {
      await db.doDeleteFavoriteData(this.props.user.uid, this.props.favorite);
      const favorites = await db.getFavorites(this.props.user.uid);
      this.props.updateFavorites(favorites);
    } catch (error) {
      this.setState({ error: error.message });
    }
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

  render() {
    const { description, name, thumbnail, review } = this.props.favorite;
    return (
      <article className={`Card ${this.props.type}`}>
        <div className="game-info" id="game-title">
          <h3>{ this.friendsName() }</h3>
          <h3>{ name }</h3>
          <img src={ thumbnail } alt="game-icon" />
          <img 
            id="delete" 
            src={ deleteIcon } 
            alt="delete-game"   
            onClick={this.handleDelete} 
          />
          <img 
            id="add" 
            src={ addIcon } 
            alt="add-game" 
            onClick={this.handleAdd} 
          />
        </div>
        <div className="game-info" id="game-description">
          <p>{ description }</p>
        </div>
        <div className={`game-info`} id="review-cont">
          <h3><span>0</span>/5</h3>
          <p 
            contenteditable={this.state.contenteditable}
            onBlur={this.handleBlur}
          >
            { review } 
          </p>
        </div>
      </article>
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