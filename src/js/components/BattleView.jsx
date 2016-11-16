var React = require('react'),
	TweenMax = require('gsap');

var BattleView = React.createClass({

	render() {
		var startFight,
			fight,
			count = 0,
			message = 0;
		if(this.props.narrative) {		
			fight = this.props.narrative.fightData.map(function(turn) {
				return <li className={'message' + (message++)} key={count++}>{turn.message}</li>
			});
			// for (var i = fight.length - 1; i >= 0; i--) {
			// 	TweenMax.to('.message' + i, 10, {
			// 		css: {
			// 			opacity: '1'
			// 		},
			// 		delay: 2 * i,
			// 	});
			// }
			// fight = fight.reverse();
		}
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