var React = require('react');

var CharacterSelection = React.createClass({

	render() {
		var src = 'http://www.marvelsynergy.com/images/ultron.png';
		if (this.props.id) {
			src = this.props.image;
		}
		return (
			<div 
				className='select' 
				key={this.props.id} 
				id={this.props.id} 
				onClick={this.props.choose}>
				<img src={src} />
			</div>
		)
	}
});

module.exports = CharacterSelection;