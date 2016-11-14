var EventEmitter = require('eventemitter3'),
	$ = require('jquery');

var characterStore = Object.create(EventEmitter.prototype);
EventEmitter.call(characterStore);

var characters = [];

function findById (id) {
    return characters.find(function (c) {
        return c.id === id;
    });
}

characterStore.getCharacters = function (id) {
	if (id) {
        return findById(Number(id));
    } else {
		return characters;
	}
};

characterStore.fetchCharacters = function (starts) {
	$.ajax({
		url: 'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' + 
			starts + 
			'&apikey=7cb23f38bdb6f335cc414779fcd42e71',
		success: function (response) {
			characters = response.data.results;
			characterStore.emit('update');
		}
	});
	return characters;
};

module.exports = characterStore;