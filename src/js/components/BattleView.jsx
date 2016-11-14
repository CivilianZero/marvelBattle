var React = require('react'),
	battleManager = require('battlemanager');

var BattleView = React.createClass({

	render() {
		var startFight,
			fight;
		if(this.props.narrative)		
			fight = this.props.narrative.fightData.map(function(turn) {
				return <li>{turn.message}</li>
			});
		if(this.props.character1 && this.props.character2) {
			startFight = this.props.children;
		}
		return (
			<section>
				{startFight}
				<ul>{fight}</ul>
			</section>
		);
	},
});

module.exports = BattleView;