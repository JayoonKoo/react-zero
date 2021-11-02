import React, { useRef, useState, memo } from 'react'
import Tries from '~/components/Tries';

const getAnswer = () => {
	const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	const answer = [];
	for (let i=0; i<4; i++) {
		answer.push(candidate.splice(Math.random() * (9 - i), 1)[0]);
	}
	return answer;
}

export default function NumberBaseball() {
	const [value, setValue] = useState("");
	const [result, setResult] = useState("");
	const [tries, setTries] = useState([]);
	const [answer, setAnswer] = useState(getAnswer());
	const inputRef = useRef(null);

	const init = (answer) => {
		setValue('');
		answer ? setResult(answer) : setResult('');
		setTries([]);
		setAnswer(getAnswer());
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (value === answer.join('')) { // 승리 조건
			setResult('홈런');
			setTries((prevTries) => [...prevTries, {id: value+Date.now(), value, result: "홈런"}]);
			alert('승리하였습니다.');
			init()
		} else { // 틀렸을 경우
			if (tries.length >= 9) {
				alert('10번 이상 실패하여 패배했습니다.');
				setResult(`정답은 ${answer}`)
				init(answer)
			} else {
				let strike = 0;
				let ball = 0;
				value.split('').forEach((v, i) => {
					v = Number(v);
					if (v === answer[i]) strike += 1;
					else if (answer.includes(v)) ball += 1;
				})
				const newResult =`${strike} 스트라이크, ${ball} 볼!` 
				setTries((prevTries) => [...prevTries, {id: value+Date.now(), value, result: newResult}]);
				setValue('');
			}
		}

		inputRef.current.focus();
	}

	const handleChange = (e) => {setValue(e.target.value)}

	return (
		<>
			<h1>{result}</h1>
			<form onSubmit={handleSubmit}>
				<input ref={inputRef} type="text" maxLength="4" value={value} onChange={handleChange}/>
				<button type="submit">확인</button>
			</form>
			<div>{tries.length} 회 시도.</div>
			<ul>
				{tries.map((v,i) => (
					<Tries key={v.id} tryInfo={v} />
				))}
			</ul>
		</>
	)
}

