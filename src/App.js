import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import UserSearch from './components/users/UserSearch';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    users: [],
    loading: false
  };
  //Populate view with initial 30 users
  /*   async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users?
    client_id=${process.env.REACT_APP_GITHUB_SEARCH_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_SEARCH_CLIENT_SECRET}`);

    this.setState({ users: res.data, loading: false });
  } */

  //Search Github users Get request from form class
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}
      &client_id=${process.env.REACT_APP_GITHUB_SEARCH_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_SEARCH_CLIENT_SECRET}`
    );

    this.setState({ users: res.data.items, loading: false });
  };
  //Clear Users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  render() {
    const { users, loading } = this.state;

    return (
      <div className="app">
        <Navbar />
        <div className="container">
          <UserSearch
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={users.length > 0 ? true : false}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
