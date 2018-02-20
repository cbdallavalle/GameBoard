import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchGames } from '../../actions';
import { auth, db } from '../../firebase';

import AddFriends from '../AddFriends/AddFriends';
import Search from '../Search/Search';
import { CardContainer } from '../CardContainer/CardContainer';
import { Header } from '../Header/Header';
import { Nav } from '../Nav/Nav';

import './Dashboard.css';

export class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      display: 'your-games',
      friendsFavorites: {}
    }
  }

  determineDisplay = () => {
    if(this.state.display === 'your-games') {
      return (
        <CardContainer 
          favorites={this.props.favorites}
          type={"games"}
        />
      )  
    } else if (this.state.display === 'friends-games') {
      return (
        <CardContainer 
          favorites={this.state.friendsFavorites}
          type={"friends"}
        />
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

  getFriendsGames = async () => {
    return await db.getFriendsFavorites(this.props.user.uid);
  }

  handleClick = async e => {
    const name = e.target.name
    if(name === 'friends-games') {
      const friendsFavorites = await this.getFriendsGames();
      this.setState({ display: name, friendsFavorites })
    } else {
      this.setState({ display: name})
    }
  }

  render() {
    return (
      <section className="Dashboard">
        <Header />
        <Nav handleClick={this.handleClick}/>
        {this.determineDisplay()}
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  favorites: state.favorites,
  user: state.user
})

export default connect(mapStateToProps, null)(Dashboard);