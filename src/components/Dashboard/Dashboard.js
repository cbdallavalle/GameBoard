import React, { Component } from 'react';
import { CardContainer } from '../CardContainer/CardContainer';
import { searchGames } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SignOutBtn } from '../SignOutBtn/SignOutBtn';
import './Dashboard.css';

export class Dashboard extends Component {

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
            <Link to='/search'>
              <button id="search-btn">
                Search for games 
              </button>
            </Link>
          </div>
        </section>
        <SignOutBtn />
        <section>
          <h2>
            <i className="fas fa-users"></i>
            Your friend's games
          </h2>
          <CardContainer />
          <div className="search">
            <button id="search-btn">Search for friends</button>
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