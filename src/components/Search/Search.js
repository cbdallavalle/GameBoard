import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    }
  }

  componentDidMount = () => {
    this.triggerSearch('arkhaM Horror');
  }

  triggerSearch = async () => {
    const search = this.props.search.toLowerCase().split(' ').join('%20');
    console.log(search)
    // const response = await fetch(`https://www.boardgamegeek.com/xmlapi/search?search=${search}`);
    // const games = await response.json();
    // console.log(games)
  }

  render() {
    return (
      <section className='Search'>
        hiasdfa
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  search: state.search
})

export default connect(mapStateToProps, null)(Search);