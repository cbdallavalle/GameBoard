import React, { Component } from 'react';
import { db } from '../../firebase';

export class AddFriends extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      usersSearched: [],
      allUsers: []
    }
  }

  componentDidMount = async() => {
    await this.getAllUsers();
  }

  getAllUsers = async() => {
    const snapshot = await db.onceGetUsers();
    const value = await snapshot.val();
    console.log('hiiii')
    const allUsers = Object.keys(value).map( key =>{ return {...value[key].user, key}} );
    console.log(allUsers)
    this.setState({ allUsers });
  }

  handleChange = e => {
    const search = e.target.value.toLowerCase();
    const users = this.state.allUsers
    const userIds = Object.keys(users);
    const matches = userIds.filter(id => (users[id].email.toLowerCase().includes(search) || users[id].firstName.toLowerCase().includes(search) || users[id].lastName.toLowerCase().includes(search)))
    const usersSearched = matches.map(id => users[id]);
    this.setState({usersSearched})
  }

  displayFriends = () => {
    return this.state.usersSearched.length ?
    this.state.usersSearched.map( (user, index) => <h4 key={index} onClick={() => this.addFriendsToDB(user)}>{user.firstName} {user.lastName}, {user.email}</h4>)
    : <div>No friends found :(</div>
  }

  addFriendsToDB = (user) => {
    //send friend and userId to doWriteFriendsData
    // await db.doWriteFavoriteData(this.props.user.uid, this.state.game);
    //Get the new friends from the db
    // const favorites = await this.getGamesFromDB();
    //call updateUsers
    // this.props.updateFavorites(favorites)
    console.log(user)
  }

  render() {
    return (
      <section className="AddFriends">
        <h1>Find new friend</h1>
        <input 
          type="text"
          placeholder="enter name or email" 
          onChange={this.handleChange}
        />
        <article>
          { this.displayFriends() }
        </article>
      </section>
    )
  }
}

// export const mapDispatchToProps = dispatch => ({
//   addFriends: friends => dispatch(addFriends(friends))
// })

export default AddFriends

// { 
    // email: "wren@wren.com",
    // firstName: "wrenom",
    // key: "YRrtMzWo0jNquYjLCQGT8ftqz703",
    // lastName: "little"
// }