export const calculator = (expr) => {
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
