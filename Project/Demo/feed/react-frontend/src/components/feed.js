import React from 'react';
import ReactDOM from 'react-dom';
import data from './fakeData.js';
import Event from './event.js';
import InfiniteScroll from 'react-infinite-scroll-component';

/*const divs = [
  <div key={1} style={{height: 200, background: '#9bc95b', ...style}}>Div no 1</div>,
  <div key={2} style={{height: 200, background: '#ffd47b', ...style}}>Div no 2</div>,
  <div key={3} style={{height: 200, background: '#95a9d6', ...style}}>Div no 3</div>,
  <div key={4} style={{height: 200, background: '#ffa8e1', ...style}}>Div no 4</div>,
  <div key={5} style={{height: 200, background: '#9bc95b', ...style}}>Div no 5</div>,
  <div key={6} style={{height: 200, background: '#ffd47b', ...style}}>Div no 6</div>,
  <div key={7} style={{height: 200, background: '#95a9d6', ...style}}>Div no 7</div>,
  <div key={8} style={{height: 200, background: '#ffa8e1', ...style}}>Div no 8</div>,
];*/

/*var fillMass = function () {
  var ex = [];
  for(var i = 0; i < 10; i++){
    ex.push(
      <div key={i+1}>
        <Event userid = {data[i].id} username = {data[i].user} date = {this.state.events[i].date} time={this.state.events[i].time} place={this.state.events[i].place} />
      </div>
    );
  }
  return ex;
}

var fData = fillMass();*/

export default class NoHeight extends React.Component {
  state = {
    news: [],
    isMoreNews: true,
    from: 0,
    to: 10,
    countOfNewElements: 10,
    countOfAllEvents: 10,
    events: []
  }

  constructor () {
    super();
    this.generateNews = this.generateNews.bind(this);
    this.refresh = this.refresh.bind(this);
    this.getEventsFromDB = this.getEventsFromDB.bind(this);
    this.getCountOfEventsFromDB = this.getCountOfEventsFromDB.bind(this);
    //this.getInfoFromExpress = this.getInfoFromExpress.bind(this);

  }

  componentWillMount() {
    fetch('/feed?from=' + String(this.state.from) + '&to=' + String(this.state.to))
      .then(res => res.json())
      .then(data => {
        this.setState({events: data});
        //alert(data + ' == ' + this.state.events);
      })
      .then(() => {
        var ex = [];
        for(var i = 0; i < this.state.countOfNewElements; i++) {
          ex.push(
            <div key={i+1}>
              <Event userid = {this.state.events[i].userid} username = {this.state.events[i].username} eventname={this.state.events[i].eventname} date = {this.state.events[i].eventdate} time={this.state.events[i].eventtime} place={this.state.events[i].eventplace}  />
            </div>
          );
        }
        //this.setState({news: ex, from: from, to: 21});
        this.setState(() => {
          return {news: ex};
        });
        this.setState(() => {
          return {from: this.state.from + this.state.countOfNewElements};
        });
        this.setState(() => {
          return {to: this.state.to + this.state.countOfNewElements};
        });
      })
  }

  getCountOfEventsFromDB() {
    fetch('/feed/count')
      .then(res => res.json())
      .then(data => {
        this.setState({countOfAllEvents: data[0].count});
        //alert(data + ' == ' + this.state.countOfAllEvents);

        if(this.state.news.length + 10 > this.state.countOfAllEvents) {
          this.state.countOfNewElements = this.state.countOfAllEvents - this.state.news.length;
        }

        if(this.state.news.length === this.state.countOfAllEvents) {
          this.setState({isMoreNews: false});
          alert('{isMoreNews: false}' + '; news.length: ' + this.state.news.length + '; countOfAllEvents: ' + this.state.countOfAllEvents);
        }
    	  else {
    	     this.setState({isMoreNews: true});
    	  }

        if(this.state.isMoreNews) {
          this.getEventsFromDB();
        }

      })
  }

  getEventsFromDB() {
    this.setState({events: []});
    fetch('/feed?from=' + String(this.state.from) + '&to=' + String(this.state.to))
      .then(res => res.json())
      .then(data => {
        this.setState({events: data});
        //alert(data + ' == ' + this.state.events);
      })
      .then(() => {
        var ex = [];
        for(var i = 0; i < 10; i++) {
          ex.push(
            <div key={i+1}>
              <Event userid = {this.state.events[i].userid} username = {this.state.events[i].username} eventname={this.state.events[i].eventname} date = {this.state.events[i].eventdate} time={this.state.events[i].eventtime} place={this.state.events[i].eventplace} description = {this.state.events[i].eventdescription} />
            </div>
          );
        }
        //this.setState({news: ex, from: from, to: 21});
        this.setState(() => {
          return {news: this.state.news.concat(ex)};
        });
        this.setState(() => {
          return {from: this.state.from + this.state.countOfNewElements};
        });
        this.setState(() => {
          return {to: this.state.to + this.state.countOfNewElements};
        });
      })
  }


  generateNews () {

    let moreNews = [];
    let count = this.state.news.length;

    this.getCountOfEventsFromDB()
    /*for (let i = 0; i < this.state.countOfNewElements; i++) {

      moreNews.push(
        <div key={count+i+1}>
          <Event userid = {this.state.events[i].userid} username = {this.state.events[i].username} eventname={this.state.events[i].eventname} date = {this.state.events[i].eventdate} time={this.state.events[i].eventtime} place={this.state.events[i].eventplace} description = {this.state.events[i].eventname} />
        </div>
      );
    }*/

    setTimeout(() => {
      this.setState({news: this.state.news.concat(moreNews)});
    }, 500);
  }

  refresh () {
    this.setState({news: []});
    setTimeout(() => {
      this.setState({news: []});
    }, 3000);
  }

  render () {
    return (
      <div>
        <InfiniteScroll
          refreshFunction={this.refresh}
          next={this.generateNews}
          hasMore={this.state.isMoreNews}
          loader={<h1>Loading...</h1>}
          endMessage={<h1>No more news</h1>}>
          {this.state.news}
        </InfiniteScroll>
      </div>
    );
  }
}
