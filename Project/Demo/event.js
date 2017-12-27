var react = require('react');
var sqlite3 = require('sqlite3').verbose();

function Event () { 
	this.addEvent = function (event) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `INSERT INTO users (name, date, time, description, userid)
					VALUES (` + event.name + `, ` + event.date + `, ` + event.time + `, ` + event.description + `, ` + event.userID + `)`;

		db.run(sql, (err) => {
			if (err) {
				return console.error(err.message);
			}
			else {
				console.log("event " + event.name + " successfully added");
				res.send("ok");
			}
		});
	}

	this.deleteEventById = function (id) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `DELETE FROM users
					WHERE id =` + id;

		db.run(sql, (err) => {
			if (err) {
				return console.error(err.message);
			}
			else {
				console.log("event " + id + " successfully deleted");
				res.send("ok");
			}
		});
	}

	this.setEventById = function (id, event) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `UPDATE comments
					SET name = ` + event.name + `, date =  ` + event.date + `, time = ` + event.time + `, place = ` + event.place + `, user_id = ` + event.userID +
					`WHERE id = ` + id;

		db.run(sql, (err) => {
			if (err) {
				return console.error(err.message);
			}
			else {
				console.log("user " + event.name + " successfully updated");
				res.send("ok");
			}
		});
	}

	this.getEventById = function (id) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `SELECT * FROM users WHERE id = ` + id;

		var data;

		db.each(sql, (err, row) => {
			if (err) {
				throw err;
			}
			console.log('Item '+ JSON.stringify(row));
			data = row;
		}, () => {
			db.close();
			console.log('Data '+ JSON.stringify(data));
			return data;
		});
	}

	this.getEventByUser = function (user) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `SELECT * FROM users WHERE user_id = ` + user.id;

		var data = [];

		db.each(sql, (err, row) => {
			if (err) {
				throw err;
			}
			console.log('Item '+ JSON.stringify(row));
			data.push(row);
		}, () => {
			db.close();
			console.log('Data '+ JSON.stringify(data));
			return data;
		});
	}  
}