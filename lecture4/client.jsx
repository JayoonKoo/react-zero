import React from "react"
import ReactDom from 'react-dom'
import ResponseCheck from './components/ResponseHook';
import './css/main.scss';

const App = () => {
	return (
		<>
			<ResponseCheck />
		</>
	)
}

ReactDom.render(<App />, document.getElementById('root'));
