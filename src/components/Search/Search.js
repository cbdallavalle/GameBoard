import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
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
    const search = this.state.search.toLowerCase().split(' ').join('%20');
    console.log(search)
    // const response = await fetch(`https://cors-anywhere.herokuapp.com/www.boardgamegeek.com/xmlapi2/search?query=${search}`);
    // const response = await fetch(`https://cors-anywhere.herokuapp.com/www.boardgamegeek.com/xmlapi2/search?query=pandemic`);
    // const responseText = await response.text();
    // const games = new window.DOMParser().parseFromString(responseText, "text/xml")
    // console.log(games)
  // "proxy": "https://cors-anywhere.herokuapp.com/"
    
    // console.log(JSON.stringify(games))
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