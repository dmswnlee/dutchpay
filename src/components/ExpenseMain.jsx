import React from "react";
import AddExpenseForm from './AddExpenseForm';
import ExpenseTable from './ExpenseTable';

const ExpenseMain = () => {
	return (
		<div>
			ExpenseMain component
			{/* LeftPane */}
			<div>
				<AddExpenseForm />
				{/* TODO: 정산 결과 컴포넌트 렌더링 */}
			</div>
			{/* RightPane */}
			<div>
				{/* TODO:  그룹명 헤더 렌더링*/}
				<ExpenseTable />
			</div>
		</div>
	);
};

export default ExpenseMain;
