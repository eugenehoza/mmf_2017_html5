import React from 'react';
import data from './fakeData.js';





export default class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: props.match.params.id,
      name: ''
    };
    this.loadUser = this.loadUser.bind(this);
  }

  loadUser(id){
    var user = data.find((element,i,arr)=>{
      if(element.id == id) return true;
    });
    this.setState({name: user.user});
  }

  componentWillMount(){
    this.loadUser(this.state.id);
  }


    render() {
      return(
        <div>
          <p>id: {this.state.id}</p>
          <p>name: {this.state.name}</p>
        </div>
      );
    }
}
