import React, { Component } from 'react'

export default class WordRelay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: 'Hello Reac',
		}
	}

	render() {
		return (
			<h1>
				{this.state.text}
			</h1>
		)
	}
}

