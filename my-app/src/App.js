import React, { useState } from "react";
import styles from "./app.module.css";

export const App = () => {
	const [firstOperand, setFirstOperand] = useState("0");
	const [nextOperand, setNextOperand] = useState("");
	const [operator, setOperator] = useState("");
	const [isResult, setIsResult] = useState(false);

	let output = firstOperand + operator + nextOperand;

	const calculator = (expr) => {
		const tokens = expr.split(/([+\-*])/);

		if (tokens.length === 0) return 0;

		let currentResult = Number(tokens[0]);

		for (let i = 1; i < tokens.length; i += 2) {
			const operator = tokens[i];
			const nextToken = Number(tokens[i + 1] || "0");
			switch (operator) {
				case "+":
					currentResult += nextToken;
					break;
				case "-":
					currentResult -= nextToken;
					break;
				default:
					break;
			}
		}

		return currentResult;
	};

	const handleNumber = (num) => {
		if (isResult) {
			setIsResult(false);
			setFirstOperand("0");
			setOperator("");
			setNextOperand("");
		}
		if (!operator) {
			setFirstOperand((prev) => (prev === "0" ? num : prev + num));
		} else {
			setNextOperand((prev) => (prev === "0" ? num : prev + num));
		}
	};

	const handleReset = () => {
		setFirstOperand("0");
		setOperator("");
		setNextOperand("");
		setIsResult(false);
	};

	const handleOperator = (op) => {
		if (isResult) setIsResult(false);

		if (nextOperand) {
			setFirstOperand(output);
			setNextOperand("");
		}
		setOperator(op);
	};

	const handleEquals = () => {
		let expr = output;
		if (operator && !nextOperand) {
			expr += "0";
		}
		const total = calculator(expr);
		setIsResult(true);
		setFirstOperand(String(total));
		setOperator("");
		setNextOperand("");
	};

	const buttons = [
		{
			id: "1",
			value: "1",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "2",
			value: "2",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "3",
			value: "3",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "4",
			value: "4",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "5",
			value: "5",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "6",
			value: "6",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "7",
			value: "7",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "8",
			value: "8",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "9",
			value: "9",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "0",
			value: "0",
			type: "number",
			className: styles.button,
			handler: handleNumber,
		},
		{
			id: "C",
			value: "C",
			type: "operator",
			className: styles.reset,
			handler: handleReset,
		},
		{
			id: "+",
			value: "+",
			type: "operator",
			className: styles.operator,
			handler: handleOperator,
		},
		{
			id: "-",
			value: "-",
			type: "operator",
			className: styles.operator,
			handler: handleOperator,
		},
		{
			id: "=",
			value: "=",
			type: "operator",
			className: styles.equals,
			handler: handleEquals,
		},
	];

	return (
		<div className={styles.app}>
			<div
				className={`${styles.screen} ${isResult ? styles.result : ""}`}
			>
				{output || "0"}
			</div>
			<div className={styles.buttons}>
				<div className={styles.buttonsNumbers}>
					{buttons.map(({ id, value, type, className, handler }) =>
						type === "number" ? (
							<button
								key={id}
								className={`${className} ${value === "0" ? styles.zero : ""}`}
								onClick={() => handler(value)}
							>
								{value}
							</button>
						) : null,
					)}
				</div>
				<div className={styles.operators}>
					{buttons.map(({ id, value, type, className, handler }) =>
						type === "operator" ? (
							<button
								key={id}
								className={className}
								onClick={() => handler(value)}
							>
								{value}
							</button>
						) : null,
					)}
				</div>
			</div>
		</div>
	);
};
