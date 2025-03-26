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

	const handleReset = () => {
		setFirstOperand("0");
		setOperator("");
		setNextOperand("");
		setIsResult(false);
	};

	const NUMS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

	return (
		<div className={styles.app}>
			<div
				className={`${styles.screen} ${isResult ? styles.result : ""}`}
			>
				{output || "0"}
			</div>
			<div className={styles.buttons}>
				<div className={styles.buttonsNumbers}>
					{NUMS.map((num) => (
						<button
							key={num}
							className={`${styles.button} ${num === "0" ? styles.zero : ""}`}
							onClick={() => handleNumber(num)}
						>
							{num}
						</button>
					))}
				</div>
				<div className={styles.operators}>
					<button className={styles.reset} onClick={handleReset}>
						C
					</button>
					<button
						className={styles.operator}
						onClick={() => handleOperator("+")}
					>
						+
					</button>
					<button
						className={styles.operator}
						onClick={() => handleOperator("-")}
					>
						-
					</button>
					<button className={styles.equals} onClick={handleEquals}>
						=
					</button>
				</div>
			</div>
		</div>
	);
};

export default App;
