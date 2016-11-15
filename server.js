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
}).value();

app.get('/records', function(req, res) {
	res.json(db.get('battleRecords').value());
});

app.post('/records', function(req, res) {
	var body = req.body,
		winner = body.winner,
		loser = body.loser;
	
	var heroWinner = db.get('battleRecords').find({ id: winner.id });
	if (heroWinner.value()) {
		heroWinner.assign({
			wins: heroWinner.value().wins + 1
		}).value();
	} else {
		heroWinner = {
			name: winner.name,
			id: winner.id,
			wins: 1,
			losses: 0
		}
		db.get('battleRecords').push(heroWinner).value();
	}

	var heroLoser = db.get('battleRecords').find({ id: loser.id });
	if (heroLoser.value()) {
		heroLoser.assign({
			losses: heroLoser.value().losses + 1
		}).value();
	} else {
		heroLoser = {
			name: loser.name,
			id: loser.id,
			wins: 0,
			losses: 1
		}
		db.get('battleRecords').push(heroLoser).value();
	}
	var returnThis = {
		winner: heroWinner,
		loser: heroLoser
	};
	res.json(returnThis);
	return;
});

app.listen(port);