import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../firebase';
import { updateFriends } from '../../actions';
import PropTypes from 'prop-types';
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
    const value = await db.onceGetUsers();
    const excludeCurrentUser = Object.keys(value).filter( key => key !== this.props.user.uid);
    const allUsers = excludeCurrentUser.map( key =>{ return {...value[key].user, key}} );
    this.setState({ allUsers });
  }

  handleChange = e => {
    const search = e.target.value.toLowerCase();
    const users = this.state.allUsers;
    const usersSearched = users.filter(users => (users.email.toLowerCase().includes(search) || users.firstName.toLowerCase().includes(search) || users.lastName.toLowerCase().includes(search)));
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

AddFriends.propTypes = {
  user: PropTypes.object.isRequired,
  updateFriends: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  updateFriends: friends => dispatch(updateFriends(friends))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddFriends)