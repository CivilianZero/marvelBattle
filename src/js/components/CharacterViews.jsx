var React = require('react');

var CharacterViews = React.createClass({

	render() {
		return <li onClick={this.props.handleCharacter} id={this.props.id}>{this.props.name}</li>;
	}
});

module.exports = CharacterViews;