import React from "react";

const Radio = ({
	type,
	labelFor,
	labelName,
	inputId,
	onChange,
	options,
	...rest
}) => {
	return (

		<div onChange={onChange} className="col-auto">

			<label htmlFor={labelFor}>{labelName}</label>
			{options.map(option => (
				<div>
					<input
						type={type}
						id={option}
						onChange={onChange}
						autoComplete="off"
						name={inputId}
						value={option}
						{...rest}
					/>
					<span> {option} </span>
				</div>
			))}
		</div>
	);
};

export default Radio;
