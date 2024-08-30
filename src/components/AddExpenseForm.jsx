import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { expensesState } from "../state/expenses";

const AddExpenseForm = () => {
	const members = useRecoilValue(groupMembersState);

	const today = new Date();
	const [date, setDate] = useState([today.getFullYear(), today.getMonth() + 1, today.getDate()].join("-"));
	const [desc, setDesc] = useState("");
	const [amount, setAmount] = useState(0);
	const [payer, setPayer] = useState(null);
	const [validated, setValidated] = useState(false);

	const setExpense = useSetRecoilState(expensesState);

	const [isDescValid, setIsDescValid] = useState(false);
	const [isAmountValid, setIsAmountValid] = useState(false);
	const [isPayerValid, setIsPayerValid] = useState(false);

	const checkFormValidity = () => {
		const descValid = desc.length > 0;
		const amountValid = amount > 0;
		const payerValid = payer !== null;

		setIsDescValid(descValid);
		setIsAmountValid(amountValid);
		setIsPayerValid(payerValid);

		return descValid && amountValid && payerValid;
	};

	const handleSubmit = event => {
		event.preventDefault();

		//console.log(date, desc, amount, payer);
		const form = event.currentTarget;
		if (checkFormValidity()) {
			//todo: 에러처리
		} else {
			//todo: state에 데이터 저장
			const newExpense = {
				date,
				desc,
				amount,
				payer,
			};
			setExpense(expense => [...expense, newExpense]);
		}
		setValidated(true);
	};

	return (
		<Form noValidate onSubmit={handleSubmit}>
			<h3>1. 비용 추가하기</h3>
			<Form.Group>
				<Form.Control
					type="date"
					placeholder="결제한 날짜를 선택해 주세요"
					value={date}
					onChange={e => setDate(e.target.value)}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Control
					type="text"
					isValid={isDescValid}
					isInvalid={!isDescValid && validated}
					placeholder="비용에 대한 설명을 입력해 주세요"
					value={desc}
					onChange={({ target }) => setDesc(target.value)}
				/>
				<Form.Control.Feedback type="invalid" data-valid={isDescValid}>
					비용 내용을 입력해 주셔야 합니다.
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group>
				<Form.Control
					type="number"
					isValid={isAmountValid}
					isInvalid={!isAmountValid && validated}
					placeholder="비용은 얼마였나요?"
					value={amount}
					onChange={({ target }) => setAmount(target.value)}
				/>
				<Form.Control.Feedback type="invalid" data-valid={isAmountValid}>
					1원 이상의 금액을 입력해 주셔야 합니다.
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group>
				<Form.Select
					required
					isValid={isPayerValid}
					isInvalid={!isPayerValid && validated}
					defaultValue=""
					onChange={({ target }) => setPayer(target.value)}>
					<option disabled value="">
						누가 결제 했나요?
					</option>
					<option>영수</option>
					{members.map(member => {
						<option key={member} value={member}>
							{member}
						</option>;
					})}
				</Form.Select>
				<Form.Control.Feedback type="invalid" data-valid={isPayerValid}>
					결제자를 선택해 주셔야 합니다.
				</Form.Control.Feedback>
				<Button type="submit">추가하기</Button>
			</Form.Group>
		</Form>
	);
};

export default AddExpenseForm;
