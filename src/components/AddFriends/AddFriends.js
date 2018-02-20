import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase';
import { updateFriends } from '../../actions';
import './AddFriends.css';

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
    const excludeCurrentUser = Object.keys(value).filter( key => key !== this.props.user.uid);
    const allUsers = excludeCurrentUser.map( key =>{ return {...value[key].user, key}} );
    this.setState({ allUsers });
  }

  handleChange = e => {
    const search = e.target.value.toLowerCase();
    const users = this.state.allUsers;
    const matches = Object.keys(users).filter(id => (users[id].email.toLowerCase().includes(search) || users[id].firstName.toLowerCase().includes(search) || users[id].lastName.toLowerCase().includes(search)));
    const usersSearched = matches.map(id => users[id]);
    this.setState({usersSearched})
  }

  displayFriends = () => {
    return this.state.usersSearched.length ?
    this.state.usersSearched.map( (friend, index) => <h4 key={index} onClick={() => this.addFriendsToDB(friend.id)}>{friend.firstName} {friend.lastName}, {friend.email}</h4>)
    : <div>No friends found :(</div>
  }

  addFriendsToDB = async (id) => {
    await db.doWriteFriendsData(this.props.user.uid, id);
    const friends = await db.getFriends(this.props.user.uid)
    this.props.updateFriends(friends);
  }

  render() {
    return (
      <section className="AddFriends">
        <input 
          type="text"
          placeholder="enter name or email" 
          onChange={this.handleChange}
        />
        <div className="display-friends">
          <article>
            { this.displayFriends() }
          </article>
        </div>
      </section>
    )
  }
}

export const mapStateToProps = state => ({
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  updateFriends: friends => dispatch(updateFriends(friends))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends)