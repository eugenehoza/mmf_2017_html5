import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, MenuItem} from 'react-foundation';
import NoHeight from './components/feed.js';
import logo from './logo.svg';
import './App.css';

const Home = () => (
	<h1>Home</h1>
)

const Nav = () => (
  <div>
    <Menu isHorizontal>
      <MenuItem><a href="/">Home</a></MenuItem>
      <MenuItem><a href="/users">Users</a></MenuItem>
	    <MenuItem><a href="/feed">Feed</a></MenuItem>
    </Menu>
  </div>
)

class App extends Component {

  render() {
    return (
      <div className="App">
	      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Nav />

        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/users" component={Users}/>
            <Route path="/feed" component={NoHeight}/>
          </div>
        </Router>
      </div>
    );
  }
}

class Users extends Component {
  state = {users: []}

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        {this.state.users.map(user =>
          <div key={user.id}>{user.username}</div>
        )}
      </div>
    );
  }
}

export default App;
