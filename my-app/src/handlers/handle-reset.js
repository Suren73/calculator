export const handleReset = ({
	setFirstOperand,
	setOperator,
	setNextOperand,
	setIsResult,
}) => {
	setFirstOperand("0");
	setOperator("");
	setNextOperand("");
	setIsResult(false);
};
