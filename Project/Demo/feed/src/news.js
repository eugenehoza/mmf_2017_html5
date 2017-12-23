import React, { Component } from 'react';
import './News.css';
import { Callout, MediaObject, MediaObjectSection, Thumbnail, Colors} from 'react-foundation';
import { Link } from 'react-router-dom';
import Faker from 'faker'


export default class NewsMod extends Component {



  render() {
    return (
      <div>
			<Callout>
				<table>
					<tbody>
						<tr className="News-header">
							<td>
								<p><a href={'/user/'+String(this.props.id)}>{this.props.name}</a> create new event on {this.props.place}</p>
								<p>{this.props.date}</p>
							</td>
						</tr>
						<tr>
								<MediaObject>
									<MediaObjectSection>
										<Thumbnail src={Faker.image.cats(300,300,true)}/>
									</MediaObjectSection>
                  <MediaObjectSection isMain>
                  {Faker.lorem.text()}
                  </MediaObjectSection>
								</MediaObject>
						</tr>
					</tbody>
				</table>


			</Callout>
	  	</div>
    );
  }
}
