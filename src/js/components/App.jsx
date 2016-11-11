var React = require('react');

var CharacterSelection = require('./CharacterSelection.jsx'),
	Search = require('./Search.jsx'),
	BattleView = require('./BattleView.jsx');

var App = React.createClass({
	render() {
		return (
			<section>
				<CharacterSelection />
				<Search />
				<BattleView />
			</section>
		)
	}
});

module.exports= App;