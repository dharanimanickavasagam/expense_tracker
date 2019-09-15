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
		<div className="col-auto">
			<label htmlFor={labelFor}>{labelName}</label>
			{options.map(option => (
				<div>
					<input
						type={type}
						id={inputId}
						onChange={onChange}
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
