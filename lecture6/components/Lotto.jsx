import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
	console.log('getWinNumbers');
	const candidate = Array(45).fill().map((v, i)=> i + 1);
	const shuffle = [];
	while(candidate.length > 0) {
		shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
	}
	const bonusNumber = shuffle[shuffle.length -1];
	const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
	return [...winNumbers, bonusNumber];
}

export default class Lotto extends Component {
	constructor(props) {
		super(props);
		this.state = {
			winNumbers: getWinNumbers(),
			winBalls: [],
			bonus: null,
			redo: false,
		};
		this.timeouts = [];
	}

	runTimeouts = () => {
		const {winNumbers} = this.state;
		for (let i=0; i < winNumbers.length -1; i++) {
			this.timeouts[i] =  setTimeout(() => {
				this.setState((prev) => {
					return {
						winBalls: [...prev.winBalls, winNumbers[i]]
					};
				});
			}, (i + 1) * 1000);
		}
		this.timeouts[6] =  setTimeout(() => {
			this.setState({
				bonus: winNumbers[6],
				redo: true
			});
		}, 7000);
	};

	componentDidUpdate() {
		if (this.state.winBalls.length === 0) {
			this.runTimeouts();
		}
	}

	componentDidMount() {
		this.runTimeouts();
	}

	onClickRedo = () => {
		this.setState({
			winNumbers: getWinNumbers(),
			winBalls: [],
			bonus: null,
			redo: false,
		});
		this.timeouts = [];
	};

	componentWillUnmount() {
		this.timeouts.forEach(clearTimeout);
	}

	render() {
		const {winBalls, redo, bonus} = this.state;
		return (
			<>
				<div>당첨 숫자</div>
				<div id="result">
					{winBalls.map((v) => <Ball key={v} number={v} />)}
				</div>
				<div>보너스!</div>
				{bonus && <Ball number={bonus} />}
				{redo && <button onClick={this.onClickRedo}>한번 더</button> }
			</>
		);
	}
}
