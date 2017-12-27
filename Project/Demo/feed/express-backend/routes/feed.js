var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET users listing. */
router.get('/', function(req, res, next) {

  let db = new sqlite3.Database('./database/test.db');

	let sql = `SELECT events.id as eventid, events.name as eventname, events.date as eventdate, events.time as eventtime, events.place as eventplace, events.userid, users.name as username
  FROM events, users WHERE (events.id >= ` + req.query.from +  `) AND (events.id <= ` + req.query.to + `) AND (events.userid = users.id);`;

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
      res.json(data);
	});


	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:


});

router.get('/count', function(req, res, next) {

  let db = new sqlite3.Database('./database/test.db');

	let sql = `SELECT COUNT(id) as count FROM events`;

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
      res.json(data);
	});


	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:


});

module.exports = router;
