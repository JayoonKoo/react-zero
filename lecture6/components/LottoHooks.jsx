import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
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

const Lotto = () => {
	const lottoNumbers =  useMemo(() => getWinNumbers(), []);
	const [winNumbers, setWinNumbers] = useState(lottoNumbers);
	const [winBalls, setWinBalls] = useState([]);
	const [bonus, setBonus] = useState(null);
	const [redo, setRedo] = useState(false);
	const timeouts = useRef([]);


	const onClickRedo = useCallback(() => {
		setWinNumbers(getWinNumbers());
		setWinBalls([]);
		setBonus(null);
		setRedo(false);
		timeouts.current = [];
	}, [winNumbers]);

	const runTimeouts = () => {
		for (let i=0; i < winNumbers.length -1; i++) {
			timeouts.current[i] =  setTimeout(() => {
				setWinBalls((prev) => [...prev, winNumbers[i]]);
			}, (i + 1) * 1000);
		}
		timeouts.current[6] =  setTimeout(() => {
			setBonus(winNumbers[6]);
			setRedo(true);
		}, 7000);
	};

	useEffect(() => {
		runTimeouts();
		return () => {
			timeouts.current.forEach((v) => {
				clearTimeout(v);
			});
		};
	}, [timeouts.current]);

	return (
		<>
			<div>당첨 숫자</div>
			<div id="result">
				{winBalls.map((v) => <Ball key={v} number={v} />)}
			</div>
			<div>보너스!</div>
			{bonus && <Ball number={bonus} />}
			{redo && <button onClick={onClickRedo}>한번 더</button> }
		</>
	);
};

export default Lotto;
	
