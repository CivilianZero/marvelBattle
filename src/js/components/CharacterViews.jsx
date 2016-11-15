var React = require('react');

var CharacterViews = React.createClass({

	render() {
		return ( 

			<li>
				<img src={this.props.photo} />
				{this.props.name}
				<button 
					id={this.props.id} 
					name={this.props.name}
					onClick={this.props.handleCharacter}>
					Select
				</button>
			</li>
		);
	}
});

module.exports = CharacterViews;