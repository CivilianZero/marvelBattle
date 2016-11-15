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
			records.push(results);
			battleStore.emit('update');
		}
	});
	return records;
};

battleStore.add = function(win, lose) {
	var winner = records.find((chara) => chara.name === win),
		loser = records.find((chara) => chara.name === lose);
	$.ajax({
		url: '/records',
		method: 'POST',
		data: {
			winner: {
				name: winner,
				wins: winner.wins++,
				losses: winner.losses
			},
			loser: {
				name: loser,
				wins: loser.wins,
				losses: loser.losses++
			}
		},
		success: function() {
			if(winner) {
				winner.wins++;
			} else {
				records.push({name: winner, wins:1, losses:0});
			}  

			if(loser) {
				loser.losses++;
			} else {
				records.push({name: loser, wins:0, losses:1});
			}
			battleStore.emit('update');
		}
	});	
}

window.battleStore = battleStore;
module.exports = battleStore;