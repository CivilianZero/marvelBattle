var React = require('react');

var CharacterViews = require('./CharacterViews.jsx');

var ResultsView = React.createClass({

	render() {
		var _this=this;
		var characterViews = this.props.searchResults.map(function(character){
			return <CharacterViews 
				key={character.id}
				name={character.name} 
				id={character.id}
				photo={character.thumbnail.path + '.' + character.thumbnail.extension} 
				handleCharacter={_this.props.handleCharacter} />
		});
		return (
			<div>
				<ul>{characterViews}</ul>
			</div>
		);
	}

});

module.exports = ResultsView;