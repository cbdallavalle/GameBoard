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
          display users that match search
        </article>
      </section>
    )
  }
}

export default AddFriends