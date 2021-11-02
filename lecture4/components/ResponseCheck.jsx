import React, { Component } from "react";

export default class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
		result: [],
  };
	timeout;
	startTime;
	endTime;

	onClickScreen = () => {
		const {state, message, result} = this.state;
		if (state === 'waiting') {
			this.setState({
				state: 'ready',
				message: '초록생이 되면 클릭하세요.'
			});
			this.timeout = setTimeout(() => {
				this.setState({
					state: 'now',
					message: "지금 클릭"
				}) // 2~3 초 랜덤
				this.startTime = new Date();
			}, Math.floor(Math.random() * 1000) + 2000);
		} else if (state === 'ready') {
			clearTimeout(this.timeout);
			this.setState({
				state : "waiting",
				message: "너무 성급하시군요! 초록색이 된 후에 클릭하세요."
			})
		} else if (state === 'now') {
			this.endTime = new Date();
			this.setState((prevState) => {
				return {
					state: "waiting",
					message: '클릭해서 시작하세요.',
					result: [...prevState.result ,this.endTime - this.startTime],
				}
			})
		}
	}

	handleReset = () => {
		this.setState({
			result: [],
		})
	}

	renderAverage = () => {
		return this.state.result.length !== 0?
			<>
				<div>편균시간: {this.state.result.reduce((a, c) => a+c) / this.state.result.length}ms</div>
				<button onClick={this.handleReset}>리셋</button>
			</>
			: null;
	}

  render() {
		const {state, message} = this.state;
    return (
      <>
        <div
          id="screen"
          className={state}
          onClick={this.onClickScreen}>
          {message}
        </div>
				{this.renderAverage()}
      </>
    );
  }
}
