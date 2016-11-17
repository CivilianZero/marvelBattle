var React = require('react');

var battleStore = require('../stores/battleStore.js');

var CharacterSelection = React.createClass({

	render() {
		var url,
			divImage,
			wins = 0,
			losses = 0,
			hero;

		if(this.props.character) {
			hero = battleStore.get(this.props.character);
		}
		
		if (this.props.character) {
			url = this.props.image;
			divImage = {backgroundImage: 'url(' + url + ')'};
		}

		if (hero){
			var { wins, losses } = hero;
		}

		return (
			<div style={divImage}
				className='select' 
				key={this.props.character} 
				id={this.props.id} 
				onClick={this.props.choose}>
				<span>{wins}</span>
				<span>{losses}</span>
			</div>
		)
	}
});

module.exports = CharacterSelection;