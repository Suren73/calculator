export const handleOperator = (
	{
		isResult,
		setIsResult,
		nextOperand,
		setFirstOperand,
		setNextOperand,
		setOperator,
	},
	output,
	op,
) => {
	if (isResult) setIsResult(false);

	if (nextOperand) {
		setFirstOperand(output);
		setNextOperand("");
	}
	setOperator(op);
};
