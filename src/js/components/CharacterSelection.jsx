var React = require('react');

var CharacterSelection = React.createClass({

	render() {
		var url = 'http://www.marvelsynergy.com/images/ultron.png',
			divImage = {backgroundImage: 'url(' + url + ')'}
		if (this.props.id) {
			url = this.props.image;
		}
		return (
			<div style={divImage}
				className='select' 
				key={this.props.id} 
				id={this.props.id} 
				onClick={this.props.choose}>
			</div>
		)
	}
});

module.exports = CharacterSelection;