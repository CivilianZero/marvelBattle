var EventEmitter = require('eventemitter3'),
	$ = require('jquery');

var battleStore = Object.create(EventEmitter.prototype);
EventEmitter.call(battleStore);

var records = [];

function findById(id) {
	return records.find(function(r) {
		return r.id === id;
	});
}

battleStore.get = function (id) {
	if(id) {
		return findById(id);
	} else {
		return records;
	}
};

battleStore.fetch = function () {
	$.ajax({
		url: '/records',
		success: function (response) {
			var results = response.results;
			if(results) {
				records.push(results);
			}
			battleStore.emit('update');
		}
	});
	return records;
};

battleStore.add = function(win, lose) {
	var winner,
		loser;
	if(records[0]) {
		winner = records.find((chara) => chara.name === win.name);
		loser = records.find((chara) => chara.name === lose.name);
	}
	$.ajax({
		url: '/records',
		method: 'POST',
		data: {
			winner: {
				name: win.name,
				id: win.id
			},
			loser: {
				name: lose.name,
				id: lose.id
			}
		},
		success: function(results) {
			if(winner) {
				winner.wins++;
			} else {
				records.push(results.winner);
			}  

			if(loser) {
				loser.losses++;
			} else {
				records.push(results.loser);
			}
			battleStore.emit('update');
		}
	});	
}

module.exports = battleStore;