var EventEmitter = require('eventemitter3'),
	$ = require('jquery');

var characterStore = Object.create(EventEmitter.prototype);
EventEmitter.call(characterStore);

var characters = {},
	url ='https://gateway.marvel.com:443/v1/public/characters?apikey=7cb23f38bdb6f335cc414779fcd42e71'

characterStore.getDetails = function () {
	return characters;
};

characterStore.fetchDetails = function () {
	$.ajax({
		url: url,
		success: function (response) {
			characters = response;
			characterStore.emit('update');
		}
	});
	return characters;
};

module.exports = characterStore;