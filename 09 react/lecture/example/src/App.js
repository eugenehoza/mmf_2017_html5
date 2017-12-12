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
	  <MenuItem><a href="/time">Time</a></MenuItem>
	  <MenuItem><a href="/sound">Sound</a></MenuItem>
      <MenuItem><a href="/date">DateNow</a></MenuItem>
	  <MenuItem><a href="/progressbar">ProgressBar</a></MenuItem>
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

//Sound - Radkevich
const Sound = () => (
	<center >
		<p>Макс Корж - Небо поможет нам.</p>
		<p><audio controls preload="false">
			<source src="./sound.mp3" type="audio/mpeg" />
		</audio></p>
	</center>
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
		  <Route path="/time" component={Time}/>
		  <Route path="/sound" component={Sound}/>
		  <Route path="/picture" component={Picture}/>
		  <Route path="/progressbar" component={ProgressBar}/>
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

// Boboed V. - Time

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <center><h2>It is {this.state.date.toLocaleTimeString()}.</h2></center>
      </div>
    );
  }
}

//Lagutko - ProgressBar

class ProgressBar extends React.Component { 
	constructor(props) { 
		super(props); 
		this.state = {counter: 100}; 
	} 

	componentDidMount() { 
		this.timerID = setInterval( 
			() => this.tick(), 
			1000 
		); 
	} 

	componentWillUnmount() { 
		clearInterval(this.timerID); 
	} 

	tick() { 
		this.setState({ 
			counter: this.state.counter - 10 
		}); 
	} 

	render() { 
		return ( 
			<div> 
				<Progress value = {this.state.counter}/> 
			</div> 
		); 
	} 
}

export default App;
