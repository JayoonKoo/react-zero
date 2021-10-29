import React, { Component } from 'react'

export default class WordRelay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			word: '구자윤',
			value: '',
			result: '',
		}
	}

	inputChange = (event) => {
		const {target: {value}} = event;
		this.setState({value,});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		const {word, value} = this.state;
		if (word[word.length-1] === value[0]) {
			this.setState({word: value,result: '정답', value: ''});
		} else {
			this.setState({result: '땡'});
		}
	}

	render() {
		const {word, value, result} = this.state;
		return (
			<>
				<h1>{word}</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={value} onChange={this.inputChange}/>
					<input type="submit" value="입력"/>
				</form>
				<div>{result}</div>
				<button>dfdf </button>
				{value}
			</>
		)
	}
}

