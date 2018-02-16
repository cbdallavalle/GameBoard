import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cleanSearch, cleanGameDetails } from '../../helper/bg-api-cleaner';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      search: this.props.search,
      game: {}
    }
  }

  componentDidMount = () => {
    this.triggerSearch();
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  triggerSearch = async () => {
    const search = this.state.search.toLowerCase().split(' ').join('+');
    const response = await fetch(`https://cors-anywhere.herokuapp.com/www.boardgamegeek.com/xmlapi2/search?query=${search}`);
    const responseText = await response.text();

    const convert = require('xml-js');
    const options = {ignoreComment: true, alwaysChildren: true };
    const result = convert.xml2js(responseText, options);
    const games = cleanSearch(result);
    console.log(games)
    this.setState({ games });  
  }

  handleChooseGame = async (gameSelected) => {
    const { id, name } = gameSelected;
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`);
    const responseText = await response.text();

    const convert = require('xml-js');
    const options = {ignoreComment: true, alwaysChildren: true };
    const result = convert.xml2js(responseText, options);
    const game = {...cleanGameDetails(result)[0], name};
    console.log(game)
    this.setState({game})
  }

  displayAllGames = () => {
    return this.state.games.map((game, index) => <h3 key={index} onClick={() => this.handleChooseGame(game)}>{game.name}</h3> )
  }

  displayGame = () => {
    return this.state.game.thumbnail ?
      <article className="game-description">
        <img src={this.state.game.thumbnail} alt="game-image" />
        <div>
          <h4>{this.state.game.name}</h4>
          <p>{this.state.game.description}</p>
        </div>
      </article>
      :
      <div>
      </div>
  }

  render() {
    return (
      <section className='Search'>
        <h1>Search for Games</h1>
        <form>
          <input 
            type="text"
            name="search"
            placeholder="Search for board games"
            value={this.state.search}
            onChange={this.handleChange}
          />
          <button type="submit">Search</button>
        </form>
        <section className='search-results'>
          { this.displayAllGames() }
        </section>
          { this.displayGame() }
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, null)(Search);