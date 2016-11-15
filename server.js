var express = require('express'),
	lowdb = require('lowdb'),
	fileAsync = require('lowdb/lib/file-async'),
	shortid = require('shortid'),
	app = express(),
	bodyParser= require('body-parser'),
	port = 3000,
	db = lowdb('db.json', { storage: fileAsync });

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/lib'));
// Remove this when we start building our Sass
app.use(express.static(__dirname + '/src/css'));

db.defaults({
	battleRecords: []
});

app.get('/Records', function(req, res) {
	res.json(db.get('battleRecords').value());
});

app.post('/Records', function(req, res) {
	var body = req.body,
		winner = body.winner,
		loser = body.loser;
	let record = {
		winner: {
			name: winner.name,
			wins: winner.wins,
			losses: winner.losses,
			id: shortid()
		},
		loser: {
			name: loser.name,
			wins: loser.wins,
			losses: loser.losses,
			id: shortid()
		}
	}
	db.get('battleRecords').push(record).value();
	res.json(record);
	return;
});

app.listen(port);