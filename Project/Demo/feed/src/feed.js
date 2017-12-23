import React from 'react';
import ReactDOM from 'react-dom';
import data from './fakeData.js';
import NewsMod from './news.js';

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

var fillMass = function () {
  var ex = [];
  for(var i = 0; i < 10; i++){
    ex.push(
      <div key={i+1}>
        <NewsMod id = {data[i].id} name = {data[i].user} date = {data[i].date} place={data[i].place}/>
      </div>
    );
  }
  return ex;
}

var fData = fillMass();

export default class NoHeight extends React.Component {
  constructor () {
    super();
    this.state = {
      news: fData,
      isMoreNews: true
    };
    this.generateNews = this.generateNews.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  generateNews () {
    let moreNews = [];
    let count = this.state.news.length;
    let countOfNewElements = 10;

    if(this.state.news.length + 10 > data.length){
      countOfNewElements = data.length - this.state.news.length;

    }


    if(this.state.news.length === data.length) {
      this.setState({isMoreNews: false});
      console.log('{isMoreNews: false}');
    }
	else {
	  this.setState({isMoreNews: true});
	}

    for (let i = 0; i < countOfNewElements; i++) {
      moreNews.push(
        <div key={count+i+1}>
          <NewsMod id = {data[count+i].id} name = {data[count+i].user} date = {data[count+i].date} place={data[count+i].place}/>
        </div>
      );
    }

    setTimeout(() => {
      this.setState({news: this.state.news.concat(moreNews)});
    }, 500);
  }

  refresh () {
    this.setState({news: []});
    setTimeout(() => {
      this.setState({news: fData});
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
