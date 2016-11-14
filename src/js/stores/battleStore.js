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

battleStore.add = function(c, wl) {
	var chara = records.find((chara) => chara.name === c)
	if(chara) {
		if(wl === 'win') {
			chara.wins++;
		} else {
			chara.losses++;
		}
	} else {
		if(wl === 'win') { 
			records.push({name: c, wins:1, losses:0});
		} else {
			records.push({name: c, wins:0, losses:1});
		}
	}
	// $.ajax({
	// 	url: '/records',
	// 	method: 'POST',
	// 	data: {
	// 		wins: records.c.wins,
	// 		losses: records.c.losses
	// 	},
	// 	success: function (response) {
	// 		records.push(response);
	// 		battleStore.emit('update');
	// 	}
	// })
	battleStore.emit('update');
}

window.battleStore = battleStore;
module.exports = battleStore;