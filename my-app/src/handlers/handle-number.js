export const handleNumber = (
	{
		isResult,
		setIsResult,
		setFirstOperand,
		setOperator,
		setNextOperand,
		operator,
	},
	num,
) => {
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
