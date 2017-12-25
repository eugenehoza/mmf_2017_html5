var react = require('react');
var sqlite3 = require('sqlite3').verbose();

function User () { 
	this.addUser = function (user) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `INSERT INTO users 
					VALUES( ` + user.login + `, ` + user.email + `, ` + user.password + `)`; 
		db.run(sql, (err) => {
			if (err) {
				return console.error(err.message);
			}
			else {
				console.log("user " + user.login + " successfully added");
				res.send("ok");
			}
		});
	}

	this.deleteUserById = function (id) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `DELETE FROM users
					WHERE id = ` + id;

		db.run(sql, (err) => {
			if (err) {
				return console.error(err.message);
			}
			else {
				console.log("user " + id + " successfully deleted");
				res.send("ok");
			}
		});
	}

	this.setUserById = function (id, user) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `UPDATE comments
					SET login = ` + user.login + `, email =  ` + user.email + `, password = ` + user.password + 
					`WHERE id = ` + id;

		db.run(sql, (err) => {
			if (err) {
				return console.error(err.message);
			}
			else {
				console.log("user " + user.login + " successfully updated");
				res.send("ok");
			}
		});
	}

	this.getUserById = function (id) { 
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

	this.logInByLogin = function (login, password) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `SELECT password FROM users WHERE login = ` + login;

		var data;

		db.each(sql, (err, row) => {
			if (err) {
				throw err;
			}
			console.log('Item '+JSON.stringify(row));
			data = row;
		}, () => {
			db.close();
			console.log('Data '+JSON.stringify(data));
			if (password == data['password']) return true;
			else return false;
		});
	}

	this.logInByEmail = function (email, password) { 
		let db = new sqlite3.Database(__dirname + '/test.db');
		let sql = `SELECT password FROM users WHERE email = ` + email;

		var data;

		db.each(sql, (err, row) => {
			if (err) {
				throw err;
			}
			console.log('Item '+JSON.stringify(row));
			data = row;
		}, () => {
			db.close();
			console.log('Data '+JSON.stringify(data));
			if (password == data['password']) return true;
			else return false;
		});
	}
}
