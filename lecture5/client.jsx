import React from 'react'
import ReactDom from 'react-dom'
import RSP from './components/RSPHokks'
import './css/main'

const App =() => {
	return (
		<>
			<RSP />
		</>
	)
}
ReactDom.render(<App />, document.getElementById('root'))
