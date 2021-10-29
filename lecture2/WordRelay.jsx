import React, { useState, useRef} from 'react'

const WordRelay = () => {
	const [word, setWord] = useState('구자윤');
	const [value, setValue] = useState("");
	const [result, setResult] = useState("");
	const inputRef = useRef(null);

	const inputChange = (event) => {
		const {target: {value}} = event;
		setValue(value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (word[word.length-1] === value[0]) {
			setWord(value);
			setResult('정답');
			setValue('');
		} else {
			setResult('땡');
		}
		inputRef.current.focus();
	}

	return (
		<>
			<h1>{word}</h1>
			<form onSubmit={handleSubmit}>
				<input ref={inputRef} type="text" value={value} onChange={inputChange}/>
				<input type="submit" value="입력"/>
			</form>
			<div>{result}</div>
		</>
	)
}

export default WordRelay;
