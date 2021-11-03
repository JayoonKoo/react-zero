import React, { Component, PureComponent } from 'react'

const rspCoords = {
	rock: '0',
	scissor: '-142px',
	paper: '-282px'
}

const scores = {
	rock: 1,
	scissor: 0,
	paper: -1,
}

const computerChoice = (imgCoord) => {
	return Object.entries(rspCoords).find(v => v[1] === imgCoord)[0];
}

export default class RSP extends Component {
	constructor(props) {
		super(props)
		this.state = {
			result: '',
			imgCoord: '0',
			score: 0,
			disabled: false
		}
		this.interval
		this.timout
	}

	handleChnage = () => {
		const {imgCoord} = this.state
		if (imgCoord === rspCoords.rock) {
			this.setState({
				imgCoord: rspCoords.scissor
			})
		} else if (imgCoord === rspCoords.scissor) {
			this.setState({
				imgCoord : rspCoords.paper
			})
		} else if (imgCoord === rspCoords.paper) {
			this.setState({
				imgCoord : rspCoords.rock
			})
		}
	}

	shouldComponentUpdate()
	
	componentDidMount() { // 컴포넌트가 첫 렌더링 된 후 
		this.interval = setInterval(() =>this.handleChnage(), 100)
	}

	componentWillUnmount() { // 컴포넌트가 제거되기 직전(부모가 나를 없앴을때)
		clearInterval(this.interval)
	}

	onClickBtn = (choice) => () =>  {
		this.setState({
				disabled: true
		})
		clearInterval(this.interval);
		clearTimeout(this.timout);
		const {imgCoord} = this.state;
		const myScore = scores[choice];
		const cpuScore = scores[computerChoice(imgCoord)];
		const diff = myScore - cpuScore;
		if (diff === 0) {
			this.setState({
				result: '비겼습니다.!'
			})
		} else {
			if ([1, -2].includes(diff)) {
				this.setState((prev) => {
					return {
						result: '이겼습니다.',
						score: prev.score + 1
					}
				})
			} else {
				this.setState((prev) => {
					return {
						result: '졌습니다.',
						score: prev.score - 1
					}
				})
			}
		}
		this.timout = setTimeout(() => {
			this.interval = setInterval(() =>this.handleChnage(), 100)
			this.setState({
				disabled: false
			})
		}, 1000)
	}

	render() {
		const {result, imgCoord, score, disabled} = this.state
		return (
			<>
				<div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
				<div>
					<button id="rock" className="btn" onClick={this.onClickBtn('rock')} disabled={disabled}>바위</button>
					<button id="scissor" className="btn" onClick={this.onClickBtn('scissor')} disabled={disabled}>가위</button>
					<button id="paper" className="btn" onClick={this.onClickBtn('paper')} disabled={disabled}>보</button>
				</div>
				<div>{result}</div>
				<div>현재 {score}점</div>
			</>
		)
	}
}
