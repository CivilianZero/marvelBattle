var React = require('react'),
	battleManager = require('battlemanager');

var CharacterSelection = require('./CharacterSelection.jsx'),
	Search = require('./SearchView.jsx'),
	BattleView = require('./BattleView.jsx'),
	characterStore = require('../stores/characterStore.js'),
	Results = require('./ResultsView.jsx'),
	battleStore = require('../stores/battleStore.js');

var App = React.createClass({

	getInitialState() {
		return {
			character1: null,
			image1: null,
			name1: '',
			character2: null,
			image2: null,
			name2: '',
			activeSelect: null,
			searchResults: null,
			narrative: null,
			records: battleStore.fetch()
		}
	},

	componentWillMount() {
		var _this = this;
		characterStore.on('update', function() {
			_this.setState({
				searchResults: characterStore.getCharacters()
			});
		});
		battleStore.on('update', function() {
			_this.setState({
				records: battleStore.get()
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

		var name1 = characterStore.getCharacters(this.state.character1).name;
		var name2 = characterStore.getCharacters(this.state.character2).name;

		return (
			<section>
				<div>
					<CharacterSelection
						records={this.state.records}
						name={name1}
						id={this.state.character1}
						image={this.state.image1}/>
					<Search 
						handleCharacter={this.handleClick} 
						id='left'
						choose={this.handleChoose}
						inputValue={this.state.name1}/>
				</div>
				<div>
					<CharacterSelection
						records={this.state.records}
						name={name2} 
						id={this.state.character2}
						image={this.state.image2}/>
					<Search 
						handleCharacter={this.handleClick} 
						id='right'
						choose={this.handleChoose}
						inputValue={this.state.name2}/>
				</div>
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
		var fight = battleManager.narrativeBattle(this.state.character1, this.state.character2)
		this.setState({
			searchResults: null,
			narrative: fight
		});
		var winner = fight.winner.name,
			loser = fight.loser.name;
		battleStore.add(winner, 'win');
		battleStore.add(loser, 'lose');
	},

	handleClick(e) {
		var image = characterStore.getCharacters(e.target.id).thumbnail;
		if (this.state.activeSelect === 'left') {
			this.setState({
				character1: e.target.id,
				image1: image.path + '.' + image.extension,
				name1: e.target.name
			})
		} else {
			this.setState({
				character2: e.target.id,
				image2: image.path + '.' + image.extension,
				name2: e.target.name
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