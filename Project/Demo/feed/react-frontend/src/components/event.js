import React, { Component } from 'react';
import './News.css';
import { Callout, MediaObject, MediaObjectSection, Thumbnail, Colors} from 'react-foundation';
import { Link } from 'react-router-dom';


export default class Event extends Component {

  findUserById() {

  }





  render() {
    return (
      <div>
			<Callout>
				<table>
					<tbody>
						<tr className="News-header">
							<td>
								<p><a href={'/user/'+String(this.props.userid)}>{this.props.username}</a> создал событие</p>
								<p>{this.props.eventname}</p>
							</td>
						</tr>
						<tr>
                  <p>Место: {this.props.place}</p>
                  <p>Время: {this.props.time}</p>
                  <p>Описание: {this.props.description}</p>
						</tr>
					</tbody>
				</table>


			</Callout>
	  	</div>
    );
  }
}
