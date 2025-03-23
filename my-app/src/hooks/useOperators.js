import styles from "../App.module.css";

const useOperators = () => {
	const assignOperatorValues = (operator, reset, operation, equals) => {
		switch (operator) {
			case "C":
				return {
					className: styles.reset,
					onClick: reset,
				};
			case "+":
				return {
					className: styles.operation,
					onClick: () => operation("+"),
				};

			case "-":
				return {
					className: styles.operation,
					onClick: () => operation("-"),
				};
			case "=":
				return {
					className: styles.equals,
					onClick: equals,
				};

			default:
				break;
		}
	};
	return {
		assignOperatorValues,
	};
};

export default useOperators;
