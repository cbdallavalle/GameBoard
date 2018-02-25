import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { db } from '../../firebase';
import * as api from '../../helper/bg-api-cleaner';
import Card from '../Card/Card';
import { updateFavorites } from '../../actions';
import loading from '../../assets/loading.gif';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      search: '',
      game: {},
      error: '',
      loading: false,
      gameAdded: 'not-added',
    }
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.triggerSearch(this.state.search);
    this.setState({search: '', loading: true})
  }


  triggerSearch = async (string) => {
    const search = string.toLowerCase().split(' ').join('+');
    try {
      const result = await api.fetchBoardGames(`https://cors-anywhere.herokuapp.com/www.boardgamegeek.com/xmlapi2/search?query=${search}`)
      const games = api.cleanSearch(result);
      this.setState({ games, error: '', loading: false, gameAdded: 'not-added' });  
    } catch (error) {
      this.setState({ error: error.message, loading: false, gameAdded: 'not-added' })
    }
  }

  handleChooseGame = async (gameSelected) => {
    this.setState({loading: true})
    const { id, name } = gameSelected;
    try {
      const result = await api.fetchBoardGames(`https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`);
      const details = await api.cleanGameDetails(result);
      const game = {...api.cleanGameDetails(result), name};
      this.setState({game, error: '', loading: false, gameAdded: 'not-added'})
    } catch (error) {
      this.setState({ error: error.message, loading: false, gameAdded: 'not-added' })
    }
  }

  addGameToFavorites = async() => {
    try {
      await db.doWriteFavoriteData(this.props.user.uid, this.state.game);
      this.setState({gameAdded: 'added'})
      const favorites = await db.getFavorites(this.props.user.uid);
      this.props.updateFavorites(favorites)
    } catch(error) {
      this.setState({ error: error.message })
    }
  }

  displayAllGames = () => {
    if(this.state.games.length)  {
      return this.state.games.map((game, index) => <h3 key={index} onClick={() => this.handleChooseGame(game)}>{game.name}</h3> )
    } else {
      return <h4 className="no-results"> No search results currently </h4>
    }
  }

  displayGame = () => {
    return this.state.game.thumbnail 
    ?  <article className="game-description">
        <button id={this.state.gameAdded} onClick={this.addGameToFavorites}></button>
        <Card favorite={this.state.game} type={"search"}/>
      </article>
    : <div></div>
  }

  displayError = () => {
    return this.state.error !== '' && <p>{this.state.error}</p>
  }

  displayLoadingGif = () => {
    return this.state.loading && <div id="loading-cont"><img src={loading} alt="loading" id="loading" /></div>
  }

  render() {
    return (
      <section className='Search'>
        { this.displayError() }
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text"
            name="search"
            placeholder="Search for board games"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
        <div className="display-friends">
          <section className='search-results'>
            { this.displayLoadingGif() }
            { this.displayAllGames() }
          </section>
        </div>
        { this.displayGame() }
      </section>
    )
  }
}

Search.propTypes = {
  user: PropTypes.object.isRequired,
  updateFavorites: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  updateFavorites: favorites => dispatch(updateFavorites(favorites))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);