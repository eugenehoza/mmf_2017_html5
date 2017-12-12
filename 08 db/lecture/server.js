var express = require('express')
var app = express()
var path    = require("path");
var sqlite3 = require('sqlite3').verbose();

app.get('/', function (req, res) {
	let db = new sqlite3.Database(__dirname + '/test.db');
	let sql = `SELECT MAX(id) FROM users;`;
	db.each(sql, (err, row) => {
		if (err) {
			throw err;
		}
		console.log('Item ' + JSON.stringify(row));
		var buffer = '<p>Карточек в базе: ' + row["MAX(id)"] + '</p>';
		
		buffer += "<a href='/createSchemaInFile'>createSchemaInFile</a><br>";
		buffer += "<a href='/dropSchemaInFile'>dropSchemaInFile</a><br>";
		buffer += "<a href='/dropSchemaInFile'>dropSchemaInFile</a><br>";
		buffer += "<a href='/copy/1'>copy 1</a><br>";
		buffer += "<a href='/delete/1'>delete 1</a><br>";
		buffer += "<a href='/filter?name=Evan'>filter Evan</a><br>";
		
		res.send(buffer);
		
	}, () => {
		db.close();
	});
	


})

app.get('/number', function (req, res) {
  res.send('4');
})

app.get('/index.html', function (req, res) {
   res.sendFile(path.join(__dirname+'/index.html'));
})

let db;

app.get('/createSchemaInMemory', (req, res) => {
  db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.run('CREATE TABLE users(id number, name text, email text)', (err) => {
    if (err) {
      return console.error(err.message);
    }});

  console.log('Created table users');

  res.send('ok');
});

app.get('/fillInMemory', (req, res) => {
  db.exec('insert into users values(1, \'test10\', \'test10@email.com\')');
  db.exec('insert into users values(2, \'test20\', \'test20@email.com\')');
  res.send('ok');
});

app.get('/readfromMemory', (req, res) => {
  let sql = `SELECT *
            FROM users
            ORDER BY name`;
  var data = [];
  db.each(sql, (err, row) => {
    if (err) {
      throw err;
    }
    console.log('Item '+JSON.stringify(row));
    data.push(row)
  }, () => {
    console.log('Data '+JSON.stringify(data));
    res.send(data);
  });
});

app.get('/readFromTest', (req, res) => {
  let db = new sqlite3.Database(__dirname + '/test.db');

  let sql = `SELECT *
            FROM users
            ORDER BY name`;

  var data = [];

  db.each(sql, (err, row) => {
    if (err) {
      throw err;
    }
    console.log('Item '+JSON.stringify(row));
    data.push(row)
  }, () => {
    db.close();
    console.log('Data '+JSON.stringify(data));
    res.send(data);
  });


});

  // Dovydenko M.
app.get('/createSchemaInFile', function (req, res) {
  let db = new sqlite3.Database(__dirname + '/test.db');

  db.run('CREATE TABLE users(id number, name text, email text)', (err) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      console.log('"table \'users\' successfully created"');
    }
  });
  res.send('ok');
})

  //Kudruavets S. - dropSchemaInFile
app.get('/dropSchemaInFile', function (req, res) {
	let db = new sqlite3.Database(__dirname + '/test.db');

	let sql = `DROP TABLE users;`;

	db.run(sql, (err) => {
		if (err) {
			return console.error(err.message);
		}
		else {
			console.log("table \'users\' successfully deleted");
			res.send("ok");
		}
	});
})

//Dubrovnik A. - copy?id=:id
app.get('/copy', function (req, res) {
let db = new sqlite3.Database(__dirname + '/test.db');
let sql = `insert into users (name, email) select name, email from users where id =` + req.param('id') + ";";

db.run(sql, (err) => {
  if (err) {
    return console.error(err.message);
  }
  else {
    console.log("user successfully copyed");
    res.send("ok");
  }
});
})

  //Avdeychik E. - delete
app.get('/delete/:id', function (req, res){
  let id = req.params.id;
  let db = new sqlite3.Database(__dirname + '/test.db');
  let sql = `DELETE FROM users
             WHERE id=` + id;

  db.run(sql, (err) => {
    if (err) {
      return console.error(err.message);
    }
    else {
      console.log("user with id: \'" + id + "\' successfully deleted");
      res.send("ok");
    }
  })
})

//Chachkova K. /filter?name=:name
app.get('/filter', function (req, res) {
	let db = new sqlite3.Database(__dirname + '/test.db');

	let sql = `SELECT * FROM users WHERE name LIKE "%` + req.query.name + `%";`;

	var data = [];

	db.each(sql, (err, row) => {
		if (err) {
			throw err;
		}
		console.log('Item '+JSON.stringify(row));
		data.push(row)
	}, () => {
		db.close();
		console.log('Data '+JSON.stringify(data));
		res.send(data);
	});
})

//Boboed V. /add?id=:id&name=:name&email=:email
app.get('/add', function (req, res) {
	let db = new sqlite3.Database(__dirname + '/test.db');

	let sql = `INSERT INTO users (id, name, email) VALUES (` + req.query.id + `, '` + req.query.name + `', '` + req.query.email + `');`;
	
	db.run(sql, (err) => {
		if (err) {
			return console.error(err.message);
		}
		else {
			console.log("user successfully added");
			res.send("user successfully added");
		}
	});
	
})

app.listen(3000);

console.log("Running at Port 3000");
