var React = require('react'),
	TweenMax = require('gsap');

var BattleView = React.createClass({

	render() {
		var startFight,
			fight,
			count = 0;
		if(this.props.narrative)		
			fight = this.props.narrative.fightData.map(function(turn) {
				return <li key={count++}>{turn.message}</li>
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