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
    this.setState({ allUsers: value });
  }

  handleChange = e => {
    const search = e.target.value.toLowerCase();
    const users = this.state.allUsers
    const userIds = Object.keys(users);
    const matches = userIds.filter(id => (users[id].email.toLowerCase().includes(search) || users[id].username.toLowerCase().includes(search)))
    const usersSearched = matches.map(id => users[id]);
    this.setState({usersSearched})
  }

  displayFriends = () => {
    return this.state.usersSearched.length ?
    this.state.usersSearched.map( (user, index) => <h4 key={index}>{user.username}, {user.email}</h4>)
    : <div>No friends found :(</div>
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

export default AddFriends