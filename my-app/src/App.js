import React, { useState } from "react";
import styles from "./App.module.css";
import useCalculator from "./hooks/useCalculator";
import useOperators from "./hooks/useOperators";
import { numbers, operators } from "./utils/utils";

const App = () => {
	const { calculator } = useCalculator();
	const { assignOperatorValues } = useOperators();

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

	// const defaultExpression = (expr) => {
	// 	setExpression(expr.slice(0, -1));
	// 	setIsResult(false);
	// };

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

	const handlerNumber = (num) => {
		isResult
			? getNumber(num)
			: setCurrentValue((prev) =>
					prev === "0" ? String(num) : prev + num,
				);
	};

	const handlerOperation = (op) => {
		isResult ? getOperationTrue(op) : getOperationFalse(op);
	};

	const handlerEquals = () => {
		let [, isLastChar] = checkLastChar(expression, currentValue);
		!isLastChar ? getDisplayOutput(expression, currentValue) : getReturn();
	};

	const handlerReset = () => {
		setExpression("");
		setCurrentValue("0");
		setIsResult(false);
	};

	return (
		<div className={styles.calculator}>
			<div
				className={`${styles.display} ${isResult ? styles.result : ""}`}
			>
				{expression + currentValue}
			</div>
			<div className={styles.buttons}>
				<div className={styles.numbers}>
					{numbers.map((num) => (
						<button
							key={num}
							onClick={() => handlerNumber(num)}
							className={`${styles.button} ${num === 0 ? styles.zero : ""}`}
							data-type="number"
						>
							{num}
						</button>
					))}
				</div>
				<div className={styles.operations}>
					{operators.map((operator) => {
						const { className, onClick } = assignOperatorValues(
							operator,
							handlerReset,
							handlerOperation,
							handlerEquals,
						);

						return (
							<div
								key={operator}
								className={className}
								onClick={onClick}
							>
								{operator}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default App;
