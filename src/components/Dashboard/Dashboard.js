import React, { Component } from 'react';
import { CardContainer } from '../CardContainer/CardContainer';
import { searchGames } from '../../actions';
import { connect } from 'react-redux';
import { Nav } from '../Nav/Nav';
import Search from '../Search/Search';
import AddFriends from '../AddFriends/AddFriends';
import { SignOutBtn } from '../SignOutBtn/SignOutBtn';
import './Dashboard.css';

export class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      display: 'your-games',
    }
  }

  determineDisplay = () => {
    if(this.state.display === 'your-games') {
      return (
        <CardContainer favorites={this.props.favorites}/>
      )  
    } else if (this.state.display === 'friends-games') {
      return (
        <CardContainer favorites={{}}/>
      )
    } else if (this.state.display === 'search-games') {
      return (
        <Search />
      )
    } else if (this.state.display === 'search-friends') {
      return (
        <AddFriends />
      )
    }

  }

  handleClick = e => {
    this.setState({ display: e.target.name})
  }

  render() {
    return (
      <section className="Dashboard">
        <nav>
          <button name='your-games' onClick={this.handleClick}>
            <i className="fas fa-user"></i> Your Games
          </button>
          <button name='friends-games' onClick={this.handleClick}>
            <i className="fas fa-users"></i> Your friend's games
          </button>
          <button name='search-games' onClick={this.handleClick}>
            Search for games 
          </button>
          <button name="search-friends" onClick={this.handleClick}>
            Search for friends
          </button>
        </nav>
        {this.determineDisplay()}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  favorites: state.favorites
})

export default connect(mapStateToProps, null)(Dashboard);