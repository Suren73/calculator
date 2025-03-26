import { calculator } from "../utils/utils";

export const handleEquals = (
	{
		operator,
		nextOperand,
		setIsResult,
		setFirstOperand,
		setOperator,
		setNextOperand,
	},
	output,
) => {
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
