import React, { Component } from 'react';
import { CardContainer } from '../CardContainer/CardContainer';
import { searchGames } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameSearch: '',
      friendSearch: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <section className="Dashboard">
        <section>
          <h2>
            <i className="fas fa-user"></i>
            Your games
          </h2>
          <CardContainer />
          <div className="search">
            <input 
              type="text"
              placeholder="Search Games..."
              name="gameSearch"
              onChange={this.handleChange}
              value={this.state.gameSearch}
            />
            <Link to='/search'>
              <button 
                id="search-btn"
                onClick={() => this.props.addSearch(this.state.gameSearch)}
              >
                Search
              </button>
            </Link>
          </div>
        </section>
        <section>
          <h2>
            <i className="fas fa-users"></i>
            Your friend's games
          </h2>
          <CardContainer />
          <div className="search">
            <input 
              type="text"
              placeholder="Search Friends..."
              name="friendSearch"
              value={this.state.friendSearch}
              onChange={this.handleChange}
            />
            <button id="search-btn">Search</button>
          </div>
        </section>
      </section>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  addSearch: search => dispatch(searchGames(search)),
})

export default connect(null, mapDispatchToProps)(Dashboard);