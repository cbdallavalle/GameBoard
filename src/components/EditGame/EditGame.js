import React, { Component } from 'react';
import exit from '../../assets/error.svg';
import './EditGame.css';

export class EditGame extends Component {
  constructor() {
    super();
    this.state = {
      owned: 'no',
      timesPlayed: '1-5',
      rating: '-',
      review: ''
    }
  }

  handleUpdate = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <form className="EditGame">
        <div 
          id="exit"
          alt="exit edit without saving" 
          onClick={this.props.handleEdit} 
        >
        </div>
        <div className="owned-cont">
          <h2>Owned?</h2>
          <div className="owned">
            <label htmlFor="owned-yes">yes</label>
            <input 
              className="option-input" 
              id="owned-yes" 
              type="radio" 
              name="owned" 
              value="yes"
              onClick={this.handleUpdate} 
            />  
            <label htmlFor="owned-no">no</label>
            <input 
              className="option-input" 
              id="owned-no" 
              type="radio" 
              name="owned" 
              value="no" 
              onClick={this.handleUpdate} 
            />  
          </div>
        </div>
        <div className="played-cont">
          <h2>Times played:</h2>
          <select className="styled-select slate" name="timesPlayed" onChange={this.handleUpdate}>
            <option value="1-5">1-5</option> 
            <option value="5-10">5-10</option>
            <option value="10+">10+</option>
          </select>
        </div>
        <div className="rating-cont">
          <h2>Rating:</h2>
          <select className="styled-select slate" name="rating" onChange={this.handleUpdate}>
            <option value="1">1</option> 
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="review-cont">
          <h2>Review:</h2>
          <textarea name="review" value={this.state.review} onChange={this.handleUpdate} />
        </div>
        <button type="submit">Save change</button>
        <button type="button">Delete from collection</button>
      </form>
    )
  }
}