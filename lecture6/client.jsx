import React from 'react';
import ReactDom from 'react-dom';
import Lotto from './components/LottoHooks';
import './css/main';

const App = () => {
	return (
		<>
			<Lotto />
		</>
	);
};

ReactDom.render(<App />, document.getElementById('root'));
