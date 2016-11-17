var React = require('react'),
	TweenMax = require('gsap');

// var BattleMessage = require('./BattleMessage.jsx');

var BattleView = React.createClass({

	render() {
		var startFight,
			fight,
			count = 0,
			index = 0;
		
		if(this.props.character1 && this.props.character2) {
			startFight = this.props.children;
		}

		if(this.props.narrative) {		
			fight = this.props.narrative.fightData.map(function(turn) {
				return (
					<li 
						className='message'
						id={'message' + index++}
						key={count++}>
						{turn.message}
					</li>
				)
			});
			for (var i = fight.length - 1; i >= 0; i--) {
				TweenMax.to('#message' + i, 1, {
					css: {
						opacity: '1',
						display: 'block'
					},
					delay: 2 * i
				});
			}
			fight.reverse();
		}
		
		return (
			<section>
				{startFight}
				<ul className='fighting'>{fight}</ul>
			</section>
		);
	},
});

module.exports = BattleView;