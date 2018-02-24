import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { db } from '../../firebase';
import './Card.css';

export class Card extends Component {
  constructor() {
    super();
    this.state = {
      contenteditable: "false"
    }
  }

  componentDidMount = async () => {
    this.props.type === 'games' && await this.setState({contenteditable: "true"})
  }

  friendsName = () => {
    return this.props.type === 'friends' ? this.props.friendName + " played:" : null
  }

  handleBlur = (e) => {
    db.doWriteReviewData(this.props.user.uid, this.props.favorite, e.target.innerHTML)
  }

  render() {
    const { description, id, image, name, thumbnail, review } = this.props.favorite;
    return (
      <article className={`Card ${this.props.display}`}>
        <div className="game-info" id="game-title">
          <h3>{ this.friendsName() }</h3>
          <h3>{ name }</h3>
          <img src={thumbnail} alt="game-icon"/>
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
    ) 
  }
}

Card.propTypes = {
  user: PropTypes.object.isRequired,
  favorite: PropTypes.object.isRequired,
  friendName: PropTypes.string,
  type: PropTypes.string
};

export const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps, null)(Card)