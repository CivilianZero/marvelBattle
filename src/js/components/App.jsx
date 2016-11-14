var React = require('react'),
	battleManager = require('battlemanager');

var CharacterSelection = require('./CharacterSelection.jsx'),
	Search = require('./SearchView.jsx'),
	BattleView = require('./BattleView.jsx'),
	characterStore = require('../stores/characterStore.js'),
	Results = require('./ResultsView.jsx');

var App = React.createClass({

	getInitialState() {
		return {
			character1: null,
			image1: null,
			character2: null,
			image2: null,
			activeSelect: null,
			searchResults: null,
			narrative: null
		}
	},

	componentWillMount() {
		var _this = this;
		characterStore.on('update', function() {
			_this.setState({
			searchResults: characterStore.getCharacters()
			});
		});
	},

	render() {
		var results;

		if (this.state.searchResults) {
			results = <Results 
				handleCharacter={this.handleClick} 
				searchResults={this.state.searchResults}/>;
		}


		return (
			<section>
				<CharacterSelection
					id={this.state.character1}
					image={this.state.image1}/>
				<Search 
					handleCharacter={this.handleClick} 
					id='left'
					choose={this.handleChoose}/>
				<CharacterSelection 
				id={this.state.character2}
				image={this.state.image2}/>
				<Search 
					handleCharacter={this.handleClick} 
					id='right'
					choose={this.handleChoose}/>
				{results}
				<BattleView 
					character1={this.state.character1}
					character2={this.state.character2}
					narrative={this.state.narrative}>
					<button onClick={this.handleFight}>FIGHT!</button>
				</BattleView>
			</section>
		)
	},

	handleFight() {
		this.setState({
			searchResults: null,
			narrative: battleManager.narrativeBattle(this.state.character1, this.state.character2)
		});
	},

	handleClick(e) {
		var image = characterStore.getCharacters(e.target.id).thumbnail;
		if (this.state.activeSelect === 'left') {
			this.setState({
				character1: e.target.id,
				image1: image.path + '.' + image.extension
			})
		} else {
			this.setState({
				character2: e.target.id,
				image2: image.path + '.' + image.extension
			})
		}
	},

	handleChoose(e) {
		this.setState({
			activeSelect: e.target.id,
			searchResults: null
		});
	}

});

module.exports= App;