import React from 'react'

export default function Tries({tryInfo}) {
	const {value, result} = tryInfo;

	return (
		<li>{value}로 시도했고, {result}</li>
	)
}
