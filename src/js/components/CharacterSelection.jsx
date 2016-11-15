var React = require('react');

var battleStore = require('../stores/battleStore.js');

var CharacterSelection = React.createClass({

	render() {
		var url,
			divImage,
			wins = 0,
			losses = 0,
			hero = this.props.records.find((chara) => chara.name === this.props.name)
		
		if (this.props.id) {
			url = this.props.image;
			divImage = {backgroundImage: 'url(' + url + ')'};
		}

		if (hero){
			var { wins, losses } = hero;
		}

		return (
			<div style={divImage}
				className='select' 
				key={this.props.id} 
				id={this.props.id} 
				onClick={this.props.choose}>
				<span>{wins}</span>
				<span>{losses}</span>
			</div>
		)
	}
});

module.exports = CharacterSelection;