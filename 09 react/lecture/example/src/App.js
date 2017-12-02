import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Menu, MenuItem, Callout} from 'react-foundation';

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
    <Menu>
      <MenuItem><a href="/">Home</a></MenuItem>
      <MenuItem><a href="/test">Test</a></MenuItem>
	  <MenuItem><a href="/picture">Picture</a></MenuItem>
      <MenuItem><a href="/date">DateNow</a></MenuItem>
    </Menu>
  </div>
)


//CallOut - Kudruavets
const CallOut = () => (
    <Callout>
      <Header/>
      <Nav/>
    </Callout>
)

//Picture - Chachkova
const Picture = () => (
	<center><img src='./picture.jpg' alt="котик"/></center>
)

class App extends Component {

  render() {
    return (
      <Router>
        <div>


          <CallOut/>

          <Route exact path="/" component={Home}/>
          <Route path="/test" component={Test}/>
          <Route path="/date" component={DateNow}/>
		  <Route path="/picture" component={Picture}/>
        </div>
      </Router>
    );
  }
}
// Kalina - Date
const DateNow = () => (
  <div className='date'>
    Date is: <DateN/>
  </div>
)
export class DateN extends Component {
    constructor() {
        super();

        var today = new Date(),
            date =today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();

        this.state = {
            date: date
        };
    }

    render() {
        return (
            <div className='date'>
                {this.state.date}
            </div>
        );
    }
}
export default App;
