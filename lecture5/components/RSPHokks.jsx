import React, { useEffect, useRef, useState } from 'react'

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

export default function RSPHokks() {
	const [result, setResult] = useState('');
	const [imgCoord, setImgCoord] = useState(rspCoords.rock);
	const [score, setScore] = useState(0);
	const [disabled, setDisabled] = useState(false);
	const interval = useRef();
	const timeout = useRef();

	useEffect(() => {
		interval.current = setInterval(handleChnage, 100)
		return () => {
			clearInterval(interval.current);
		}
	}, [imgCoord])

	const handleChnage = () => {
		if (imgCoord === rspCoords.rock) {
			setImgCoord(()=> rspCoords.scissor);
		} else if (imgCoord === rspCoords.scissor) {
			setImgCoord(() => rspCoords.paper);
		} else if (imgCoord === rspCoords.paper) {
			setImgCoord(() => rspCoords.rock);
		}
	}

	const onClickBtn = (choice) => () => {
		setDisabled(true);
		clearInterval(interval.current);
		clearTimeout(timeout.current);
		const myScore = scores[choice];
		const cpuScore = scores[computerChoice(imgCoord)];
		const diff = myScore - cpuScore;
		if (diff === 0) {
			setResult('비겼습니다');
		} else {
			if ([1, -2].includes(diff)) {
				setResult('이겼습니다.')
				setScore((prevScore) => prevScore + 1);
			} else {
				setResult('졌습니다');
				setScore((prevScore) => prevScore - 1);
			}
		}
		timeout.current = setTimeout(() => {
			interval.current = setInterval(handleChnage, 100)
			setDisabled(false)
		}, 1000)
	}

	return (
		<>
			<div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
				<div>
					<button id="rock" className="btn" onClick={onClickBtn('rock')} disabled={disabled}>바위</button>
					<button id="scissor" className="btn" onClick={onClickBtn('scissor')} disabled={disabled}>가위</button>
					<button id="paper" className="btn" onClick={onClickBtn('paper')} disabled={disabled}>보</button>
				</div>
				<div>{result}</div>
				<div>현재 {score}점</div>
		</>
	)
}
