import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cleanSearch } from '../../helper/bg-api-cleaner';
import './Search.css';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      search: this.props.search
    }
  }

  componentDidMount = () => {
    this.triggerSearch('arkhaM Horror');
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  triggerSearch = async () => {
    // const search = this.state.search.toLowerCase().split(' ').join('+');
    // console.log(search)
    // const response = await fetch(`https://cors-anywhere.herokuapp.com/www.boardgamegeek.com/xmlapi2/search?query=${search}`);
    const response = await fetch(`https://cors-anywhere.herokuapp.com/www.boardgamegeek.com/xmlapi2/search?query=pandemic&type=boardgame`);
    const responseText = await response.text();
    // const xmlText = new window.DOMParser().parseFromString(responseText, "text/xml")
    console.log('pending...');

    var convert = require('xml-js');
    var options = {ignoreComment: true, alwaysChildren: true };
    var result = convert.xml2js(responseText, options);
    const games = cleanSearch(result);
    console.log(games);
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
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, null)(Search);