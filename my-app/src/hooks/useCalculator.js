const useCalculator = () => {
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
					return;
			}
		}
		return currentResult;
	};
	return {
		calculator,
	};
};

export default useCalculator;
