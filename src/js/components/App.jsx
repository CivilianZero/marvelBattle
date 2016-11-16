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
			name1: null,
			character2: null,
			image2: null,
			name2: null,
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
				searchResults={this.state.searchResults}
				classProp={this.state.activeSelect}/>;
		}

		return (
			<section>
				<div className='image-rapper'>
					<div className='character-wrapper'>
						<CharacterSelection
							records={this.state.records}
							name={this.state.name1}
							id={this.state.character1}
							image={this.state.image1}/>
						<Search 
							handleCharacter={this.handleClick} 
							id='left'
							choose={this.handleChoose}/>
					</div>
					<div className='character-wrapper'>
						<CharacterSelection
							records={this.state.records}
							name={this.state.name2} 
							id={this.state.character2}
							image={this.state.image2}/>
						<Search 
							handleCharacter={this.handleClick} 
							id='right'
							choose={this.handleChoose}/>
					</div>
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
		var winner = fight.winner,
			loser = fight.loser;
		battleStore.add(winner, loser);
	},

	handleClick(e) {
		var image = characterStore.getCharacters(e.target.id).thumbnail;
		if (this.state.activeSelect === 'left') {
			this.setState({
				character1: e.target.id,
				image1: image.path + '.' + image.extension,
				name1: e.target.name,
				searchResults: null
			})
		} else {
			this.setState({
				character2: e.target.id,
				image2: image.path + '.' + image.extension,
				name2: e.target.name,
				searchResults: null
			})
		}
	},

	handleChoose(e) {
		this.setState({
			activeSelect: e.target.id
		});
	}

});

module.exports = App;