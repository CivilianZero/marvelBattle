var React = require('react');

var battleStore = require('../stores/battleStore.js');

var CharacterSelection = React.createClass({

	render() {
		var src = 'http://www.marvelsynergy.com/images/ultron.png',
			wins = 0,
			losses = 0;
		if (this.props.id) {
			src = this.props.image;
		}
		if (this.props.records.indexOf(this.props.name) !== -1){
			var { wins, losses } = this.props.records;
		}
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