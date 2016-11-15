var React = require('react');

var CharacterViews = React.createClass({

	render() {
		return ( 
			<li id={this.props.id}>
				<img 
					onClick={this.props.handleCharacter} 
					src={this.props.photo} 
					id={this.props.id} 
					name={this.props.name}/>
				{this.props.name}
			</li>
		);
	}
});

module.exports = CharacterViews;