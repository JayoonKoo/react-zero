import React ,{useState, useRef} from 'react';

function Hooks() {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
	const useInput = useRef(null);

	const isRight = first * second === Number(value);

	const setRandom =  () => {
		setFirst(Math.ceil(Math.random() * 9))
		setSecond(Math.ceil(Math.random() * 9))
	}

	const handleChange = (e) => setValue(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isRight) {
			setResult('정답' + value);
			setRandom();
			setValue('');
		} else {
			setResult('땡');
		}
		useInput.current.focus();
	}

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userInput">
          {first} 곱하기 {second} 는 ?
        </label>
        <input ref={useInput} type="number" id="userInput" value={value} onChange={handleChange} />
				<input type="submit" value="입력 !" />
      </form>
			<div>{result}</div>
    </>
  );
}

export default Hooks;
