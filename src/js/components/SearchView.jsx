var React = require('react');

var Results = require('./ResultsView.jsx'),
	characterStore = require('../stores/characterStore.js');

var SearchView = React.createClass({

	getInitialState() {
		return {
			inputValue: '',
			searchResults: null,
			characterSelected: false
		}
	},

	componentWillMount() {
		var _this = this;
		characterStore.on('update', function() {
			_this.setState({
				searchResults: characterStore.getCharacters(),
			});
		});
	},

	render() {
		var classes = 'search ' + this.props.id,
			buttonToggle = this.handleClick,
			toggleClass = 'search-button';

		if (this.state.characterSelected) {
			buttonToggle = this.props.handleRemove;
			toggleClass = 'remove'
		}

		return (
			<div className={classes}>
				<input 
					type='text' 
					ref='search'
					id={this.props.id} 
					onChange={this.handleChange}
					placeholder='Search' 
					onKeyPress={this.handleKeyPress}
					onClick={this.props.choose}
					value={this.state.inputValue} />
				<button 
					className={toggleClass} 
					id={this.props.id} 
					onClick={buttonToggle} />
			</div>
		);
	},

	handleClick() {
		characterStore.fetchCharacters(this.state.inputValue)
		this.setState({
			inputValue: '',
		});
	},

	handleKeyPress(e) {
		if(e.key === 'Enter') {
			characterStore.fetchCharacters(this.state.inputValue)
			this.setState({
				inputValue: '',
			});
		}
	},

	handleChange() {
		this.setState({
			inputValue: this.refs.search.value,
		});
	}
});

module.exports = SearchView;