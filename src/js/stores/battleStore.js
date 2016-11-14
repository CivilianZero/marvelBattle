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

battleStore.winner = function(winner) {
	$.ajax({
		url: '/records',
		method: 'POST',
		data: ,
		success: function (response) {
			records.push(response);
			battleStore.emit('update');
		}
	})
}

module.exports = battleStore;