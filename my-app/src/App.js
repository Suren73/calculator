import React, { useState } from "react";
import styles from "./App.module.css";

const App = () => {
	const calculator = (expr) => {
		const tokens = expr.split(/([+\-*])/);
		let currentResult = Number(tokens[0]);

		for (let i = 1; i < tokens.length; i += 2) {
			const operator = tokens[i];
			const nextToken = Number(tokens[i + 1]);

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

	const [currentValue, setCurrentValue] = useState("0");
	const [expression, setExpression] = useState("");
	const [isResult, setIsResult] = useState(false);

	const getDisplayOutput = (expr, current) => {
		const finalExpression = expr + current;
		const result = calculator(finalExpression);

		setCurrentValue(String(result));
		setExpression("");
		setIsResult(true);
	};

	const getReturn = () => {
		return;
	};

	const checkLastChar = (expr, current) => {
		let newExpression = expr + current;
		const lastChar = newExpression.slice(-1);
		const isLastChar = ["+", "-"].includes(lastChar);
		return [newExpression, isLastChar];
	};

	const getNumber = (num) => {
		setExpression("");
		setCurrentValue(String(num));
		setIsResult(false);
	};

	const getOperationTrue = (op) => {
		setExpression(currentValue + op);
		setCurrentValue("");
		setIsResult(false);
	};

	const getOperationFalse = (op) => {
		let [newExpression, isLastChar] = checkLastChar(
			expression,
			currentValue,
		);

		newExpression = isLastChar
			? newExpression.slice(0, -1) + op
			: newExpression + op;

		setExpression(newExpression);
		setCurrentValue("");
	};

	const handleNumber = (num) => {
		isResult
			? getNumber(num)
			: setCurrentValue((prev) =>
					prev === "0" ? String(num) : prev + num,
				);
	};

	const handleOperation = (op) => {
		isResult ? getOperationTrue(op) : getOperationFalse(op);
	};

	const handleEquals = () => {
		let [, isLastChar] = checkLastChar(expression, currentValue);
		!isLastChar ? getDisplayOutput(expression, currentValue) : getReturn();
	};

	const handleReset = () => {
		setExpression("");
		setCurrentValue("0");
		setIsResult(false);
	};

	// const NUMS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];

	const buttons = [
		{
			id: "9",
			label: "9",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "8",
			label: "8",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "7",
			label: "7",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "6",
			label: "6",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "5",
			label: "5",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "4",
			label: "4",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "3",
			label: "3",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "2",
			label: "2",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "1",
			label: "1",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "0",
			label: "0",
			type: "number",
			handler: handleNumber,
			className: styles.button,
		},
		{
			id: "C",
			label: "C",
			type: "operator",
			handler: handleReset,
			className: styles.reset,
		},
		{
			id: "+",
			label: "+",
			type: "operator",
			handler: handleOperation,
			className: styles.operation,
		},
		{
			id: "-",
			label: "-",
			type: "operator",
			handler: handleOperation,
			className: styles.operation,
		},
		{
			id: "=",
			label: "=",
			type: "operator",
			handler: handleEquals,
			className: styles.equals,
		},
	];

	return (
		<div className={styles.app}>
			<div
				className={`${styles.display} ${isResult ? styles.result : ""}`}
			>
				{expression + currentValue}
			</div>
			<div className={styles.buttons}>
				<div className={styles.numbers}>
					{buttons.map(({ id, label, type, handler, className }) =>
						type === "number" ? (
							<button
								key={id}
								onClick={() => handler(label)}
								className={`${className} ${label === "0" ? styles.zero : ""}`}
							>
								{label}
							</button>
						) : null,
					)}
				</div>
				<div className={styles.operations}>
					{buttons.map(({ id, label, type, handler, className }) =>
						type === "operator" ? (
							<div
								key={id}
								className={className}
								onClick={
									label === "+" || "-"
										? () => handler(label)
										: handler
								}
							>
								{label}
							</div>
						) : null,
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
