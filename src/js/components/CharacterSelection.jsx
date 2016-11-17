var React = require('react');

var battleStore = require('../stores/battleStore.js');

var CharacterSelection = React.createClass({

	render() {
		var url,
			divImage,
			hero;

		if(this.props.character) {
			hero = battleStore.get(this.props.character);
			if (hero) {
				var { wins, losses } = hero;
			}
		}
		
		if (this.props.character) {
			url = this.props.image;
			divImage = {backgroundImage: 'url(' + url + ')'};
		}

		return (
			<div style={divImage}
				className='select' 
				key={this.props.character} 
				id={this.props.id} 
				onClick={this.props.choose}>
				<div className='win-loss'>
					<span className='wins'>{wins}</span>
					<span className='losses'>{losses}</span>
				</div>
			</div>
		)
	}
});

module.exports = CharacterSelection;