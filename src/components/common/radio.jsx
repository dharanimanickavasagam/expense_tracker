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
<<<<<<< HEAD
		<div onChange={onChange} className="col-auto">
=======
		<div className="col-auto">
>>>>>>> master
			<label htmlFor={labelFor}>{labelName}</label>
			{options.map(option => (
				<div>
					<input
						type={type}
<<<<<<< HEAD
						id={option}
=======
						id={inputId}
						onChange={onChange}
						autoComplete="off"
>>>>>>> master
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
