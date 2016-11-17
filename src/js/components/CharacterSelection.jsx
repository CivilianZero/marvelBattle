var React = require('react');

var battleStore = require('../stores/battleStore.js');

var CharacterSelection = React.createClass({

	getInitialState() {
		return {
			records: battleStore.fetch()
		}
	},

	componentWillMount() {
		var _this = this;
		battleStore.on('update', function() {
			_this.setState({
				records: battleStore.get()
			});
		});
	},

	render() {
		var url,
			divImage,
			hero;

		if(this.props.character) {
			hero = this.state.records.find((chara) => chara.name === this.props.name);
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