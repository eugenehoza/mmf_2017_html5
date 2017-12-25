import React from 'react';
import ReactDOM from 'react-dom';
import './form.css';


var today = new Date();
var E = {name: '', 
    description: '',
    data: '',
    time: ''}

export default class Event extends React.Component {
	constructor(props) {
    super(props);
    this.state = {value: {name: '', 
    description: '',
    day: today.getDate(),
    month: (today.getMonth() + 1),
    year: today.getFullYear(),
    hours: today.getHours(),
	minutes: today.getMinutes(),
	massage: "Событие добавлено"}};

    this.nameChange = this.nameChange.bind(this);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.dayChange = this.dayChange.bind(this);
    this.monthChange = this.monthChange.bind(this);
    this.yearChange = this.yearChange.bind(this);
    this.hoursChange = this.hoursChange.bind(this);
	this.minutesChange = this.minutesChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
  }

  nameChange(event) {
    this.setState({value: {name: event.target.value, 
    	description: this.state.value.description, 
    	day: this.state.value.day, 
    	month: this.state.value.month, 
    	year: this.state.value.year, 
    	hours: this.state.value.hours, 
    	minutes: this.state.value.minutes,
    	massage: "Событие добавлено"}});
  }

  descriptionChange(event) {
    this.setState({value: {name: this.state.value.name,
    	description: event.target.value, 
    	day: this.state.value.day, 
    	month: this.state.value.month, 
    	year: this.state.value.year, 
    	hours: this.state.value.hours, 
    	minutes: this.state.value.minutes,
    	massage: "Событие добавлено"}});
  }

  dayChange(event) {
    this.setState({value: {name: this.state.value.name,
    	description: this.state.value.description, 
    	day: event.target.value, 
    	month: this.state.value.month, 
    	year: this.state.value.year, 
    	hours: this.state.value.hours, 
    	minutes: this.state.value.minutes,
    	massage: "Событие добавлено"}});
  }

  monthChange(event) {
    this.setState({value: {name: this.state.value.name,
    	description: this.state.value.description, 
    	day: this.state.value.day, 
    	month: event.target.value, 
    	year: this.state.value.year, 
    	hours: this.state.value.hours, 
    	minutes: this.state.value.minutes,
    	massage: "Событие добавлено"}});
  }

  yearChange(event) {
    this.setState({value: {name: this.state.value.name,
    	description: this.state.value.description, 
    	day: this.state.value.day, 
    	month: this.state.value.month, 
    	year: event.target.value, 
    	hours: this.state.value.hours, 
    	minutes: this.state.value.minutes,
    	massage: "Событие добавлено"}});
  }

  hoursChange(event) {
    this.setState({value: {name: this.state.value.name,
    	description: this.state.value.description, 
    	day: this.state.value.day, 
    	month: this.state.value.month, 
    	year: this.state.value.year,  
    	hours: event.target.value, 
    	minutes: this.state.value.minutes,
    	massage: "Событие добавлено"}});
  }

  minutesChange(event) {
    this.setState({value: {name: this.state.value.name,
    	description: this.state.value.description, 
    	day: this.state.value.day, 
    	month: this.state.value.month, 
    	year: this.state.value.year,  
    	hours: this.state.value.hours, 
    	minutes: event.target.value,
    	massage: "Событие добавлено"}});
  }

  handleSubmit(event) {
  	let err = null;
  	if (this.state.value.day < 1 
  		|| this.state.value.month < 1 
  		|| this.state.value.year< today.getFullYear() 
  		|| this.state.value.day > 31 
  		|| this.state.value.month > 12 
  		|| (this.state.value.month == 2 && this.state.value.day > 29)
  		|| (this.state.value.month == 2 && this.state.value.day > 28 && this.state.value.year % 4 != 0)
  		|| ((this.state.value.month == 4 || this.state.value.month == 6 || this.state.value.month == 9 || this.state.value.month == 11) 
  						&& this.state.value.day > 30)
  		|| (today.getFullYear() == this.state.value.year && this.state.value.month < (today.getMonth() + 1))
  		|| (today.getFullYear() == this.state.value.year && this.state.value.month == (today.getMonth() + 1)
  						&& this.state.value.day < today.getDate()))
  	{
  		err = "Неверно введена дата \n";
  	}

  	if (this.state.value.hours > 23
  		|| this.state.value.hours < 0
  		|| this.state.value.minutes < 0
  		|| this.state.value.minutes > 59
  		|| (today.getFullYear() == this.state.value.year && this.state.value.month == (today.getMonth() + 1) 
  						&& this.state.value.day == today.getDate() && this.state.value.hours <= today.getHours()))
  	{
  		err = (err == null)?'':err;
  		err += "Неверно введено время \n";
  	}

  	if (this.state.value.name.length < 3)
  	{
  		err = (err == null)?'':err;
  		err += "Название должно содержать 3 или более символов \n";
  	}

  	if (this.state.value.description.length < 10)
  	{
  		err = (err == null)?'':err;
  		err += "Описание должно содержать 10 или более символов \n";
  	}

  	if (err != null)
  		alert(err);
  	else
  	{
  	E = {name: this.state.value.name,
  		description: this.state.value.description,
  		data: this.state.value.day + "-" + this.state.value.month + "-" + this.state.value.year,
  		time: this.state.value.hours + ':' + this.state.value.minutes};
  	alert(this.state.value.massage + '\n'
		+ E.name + '\n' 
  		+ E.description + '\n' 
  		+ E.data + '\n' 
  		+ E.time);
  	}	
    event.preventDefault();
  }

	render () {
		return (
		<form  onSubmit={this.handleSubmit}>
       		<header align="center">
        		Добавьте мероприятие
        	</header>
        	<table>
            	<tr>
              		Название
            	</tr>
            	<tr>
              		<input type="text"  value={this.state.value.name} onChange={this.nameChange} />
            	</tr>
            	<tr>
              		Описание
            	</tr>
            	<tr>
              		<input type="text" value={this.state.value.description} onChange={this.descriptionChange} />
            	</tr>
        	</table>
        	<table>
          		<td>
            		<tr>
             			День 
           			</tr>
           			<tr>
            			<input type="number" value={this.state.value.day} onChange={this.dayChange} />
           			</tr>
          		</td>

          		<td>
           			<tr>
            			Месяц 
           			</tr>
           			<tr>
             			<input type="number" value={this.state.value.month} onChange={this.monthChange} />
          			</tr>
          		</td>

          		<td>
            		<tr>
             			Год
           			</tr>
           			<tr>
             			<input type="number" value={this.state.value.year} onChange={this.yearChange} />
           			</tr>
          		</td>
        	</table>

        	<table>
          		<td>
            		<tr>
             			Часы
           			</tr>
           			<tr>
             			<input type="number" value={this.state.value.hours} onChange={this.hoursChange} />
           			</tr>
          		</td>

          		<td>
            		<tr>
             			Минуты
           			</tr>
           			<tr>
             			<input type="number" value={this.state.value.minutes} onChange={this.minutesChange} />
           			</tr>
          		</td>
        	</table>
        	<table>
            	<tr>
              		Добавьте фото
            	</tr>
            	<tr>
              		<input type="file" name="photo" multiple accept="image/*"/>
            	</tr>
        	</table>
        	<input type="submit" value="Add" />
      	</form>
		);
	}
}