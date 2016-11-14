var React = require('react');

var battleStore = require('../stores/battleStore.js');

var CharacterSelection = React.createClass({

	render() {
		var src = 'http://www.marvelsynergy.com/images/ultron.png';
		if (this.props.id) {
			src = this.props.image;
		}
		var record = battleStore.get(this.props.id),
			{ wins, losses } = record;
		return (
			<div 
				className='select' 
				key={this.props.id} 
				id={this.props.id} 
				onClick={this.props.choose}>
				<span>{wins}</span>
				<span>{losses}</span>
				<img src={src} />
			</div>
		)
	}
});

module.exports = CharacterSelection;