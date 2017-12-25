import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, MenuItem, Callout } from 'react-foundation';
import Event from './addevent.js';

const Test = () => (
  <div>
    Test page for react-router
  </div>
)

const Header = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
  </div>
)

const Home = () => (
  <p>
    Welcome from start page
  </p>
)

const Nav = () => (
  <div>
    <Menu isVertical>
      <MenuItem><a href="/addevent">Event</a></MenuItem>
    </Menu>
  </div>
)

const ModView = () => (
	<table>
	<tbody>
		<tr>
			<td style = {{width: '15%'}}>
				<div style = {{position: 'fixed', top: '30%'}}>
					<Nav />
				</div>
			</td>
			<td>
				<Header/>
        	<Route path="/addevent" component={Event}/>
			</td>
		</tr>
	</tbody>
	</table>
)

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <ModView />
        </div>
      </Router>
    );
  }
}






export default App;
