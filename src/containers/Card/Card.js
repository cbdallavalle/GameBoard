import React, { Component } from 'react';
import PropTypes from 'prop-types';
import deleteIcon from '../../assets/error.svg';
import addIcon from '../../assets/plus.svg';
import editIcon from '../../assets/pencil.svg';
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
      edit: false
    };
  }

  friendsName = () => {
    return this.props.type === 'friends' 
      ? this.props.friendName + ' played:' 
      : null;
  }

  // handleBlur = (event) => {
  //   try {
  //     db.doWriteReviewData(
  //       this.props.user.uid, 
  //       this.props.favorite, 
  //       event.target.innerHTML
  //     );
  //   } catch (error) {
  //     this.setState({ error: error.message });
  //   }
  // }

  handleEdit = () => {
    console.log('edittting')
    this.setState({ edit: !this.state.edit })
  }

  // handleDelete = async () => {
  //   try {
  //     await db.doDeleteFavoriteData(this.props.user.uid, this.props.favorite);
  //     const favorites = await db.getFavorites(this.props.user.uid);
  //     favorites 
  //     ? this.props.updateFavorites(favorites) 
  //     : this.props.updateFavorites({});
  //   } catch (error) {
  //     this.setState({ error: error.message });
  //   }
  // }

  handleAdd = async () => {
    try {
      await db.doAddFavoriteData(this.props.user.uid, this.props.favorite);
      const favorites = await db.getFavorites(this.props.user.uid);
      this.props.updateFavorites(favorites);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  determineDisplay = () => {
    const { description, name, thumbnail, review } = this.props.favorite;

    return !this.state.edit ?
    <article className={`Card ${this.props.type}`}>
        <div className="game-info" id="game-title">
          <h3>{ this.friendsName() }</h3>
          <h3>{ name }</h3>
          <img src={ thumbnail } alt="game-icon" />
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
          <h3><span>0</span>/5</h3>
          <p>
            { review } 
          </p>
        </div>
      </article>
      :
      <EditGame game={this.props.favorite} handleEdit={this.handleEdit} />
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