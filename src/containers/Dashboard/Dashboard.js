import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { db } from '../../firebase';

import AddFriends from '../AddFriends/AddFriends';
import Search from '../Search/Search';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { Header } from '../../components/Header/Header';
import { Nav } from '../../components/Nav/Nav';

import './Dashboard.css';

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      friendsFavorites: {},
      error: ''
    };
  }

  componentWillReceiveProps = () => {
    this.updateFavorites();
  }

  updateFavorites = async() => {
    try {
      if (this.props.user.uid) {
        const friendsFavorites = await 
          db.getFriendsFavorites(this.props.user.uid);
        this.setState({ friendsFavorites });
      }
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <section className="Dashboard">
        <Header />
        <div className="body-cont">
        <Nav handleClick={this.handleClick}/>
          <Switch>
            <Route
              exact path="/dashboard/your-games"
              render={ () => 
                <CardContainer 
                  favorites={this.props.favorites} 
                  type={"games"} 
                /> 
              }
            />
            <Route 
              exact path="/dashboard/friends-games" 
              render={ () => 
                <CardContainer 
                  favorites={this.state.friendsFavorites} 
                  type={"friends"} 
                /> 
              }
            />
            <Route 
              exact path="/dashboard/search-games" 
              component={ Search }
            />
            <Route 
              exact path="/dashboard/search-users" 
              component={ AddFriends }
            />
          </Switch>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  favorites: PropTypes.object.isRequired,
  user: PropTypes.object
};

export const mapStateToProps = state => ({
  favorites: state.favorites,
  user: state.user
});

export default withRouter(connect(mapStateToProps, null)(Dashboard));