import React from "react";
import { useRecoilValue } from "recoil";
import { expensesState } from "../state/expenses";
import { groupMembersState } from "../state/groupMembers";
import styled from "styled-components";
import { StyledTitle } from "./AddExpenseForm";

export const calculateMinimumTransaction = (expenses, members, amountPerson) => {
	const minTransactions = [];

	if (amountPerson === 0) {
		return minTransactions;
	}

	//1. 사람별로 냈어야 할 금액
	const membersToPay = {};
	members.forEach(member => {
		membersToPay[member] = amountPerson;
	});

	//2. 사람별로 냈어야 할 금액 업데이터
	expenses.forEach(({ payer, amount }) => {
		membersToPay[payer] -= amount;
	});

	//3. amount별로 오름 차순으로 sorting이 된 리스트 생성
	const sortedMembersToPay = Object.keys(membersToPay)
		.map(member => ({
			member: member,
			amount: membersToPay[member],
		}))
		.sort((a, b) => a.amount - b.amount);

	var left = 0;
	var right = sortedMembersToPay.length - 1;
	while (left < right) {
		while (left < right && sortedMembersToPay[left].amount === 0) {
			left++;
		}
		while (left > right && sortedMembersToPay[right].amount === 0) {
			right--;
		}

		const toReceive = sortedMembersToPay[left];
		const toSend = sortedMembersToPay[right];
		const amountToReceive = Math.abs(toReceive.amount);
		const amountToSend = Math.abs(toSend.amount);

		if (amountToSend > amountToReceive) {
			minTransactions.push({
				receiver: toReceive.member,
				sender: toSend.member,
				amount: amountToReceive,
			});
			toReceive.amount = 0;
			toSend.amount -= amountToReceive;
			left++;
		} else {
			minTransactions.push({
				receiver: toReceive.member,
				sender: toSend.member,
				amount: amountToSend,
			});
			toSend.amount = 0;
			toReceive.amount += amountToSend;
			right--;
		}
	}

	return minTransactions;
};

const SettlementSummary = () => {
	const expenses = useRecoilValue(expensesState);
	// const members = useRecoilValue(groupMembersState);
	const members = ["A", "B", "C", "D"];

	const totalExpenseAmount = parseFloat(
		expenses.reduce((prevAmount, curExpense) => prevAmount + parseFloat(curExpense.amount), 0),
	);
	const groupMembersCount = members ? members.length : 0;
	const splitAmount = totalExpenseAmount / groupMembersCount;

	const minimumTransaction = calculateMinimumTransaction(expenses, members, splitAmount);

	return (
		<StyledWrapper>
			<StyledTitle>2. 정산은 이렇게!</StyledTitle>
			{totalExpenseAmount > 0 && groupMembersCount > 0 && (
				<div>
					<StyledSummary>
						<span>
							{groupMembersCount}명이서 총 {totalExpenseAmount}원 지출
						</span>
						<br />
						<span>한 사람 당 {splitAmount}원</span>
					</StyledSummary>

					<StyledUl>
						{minimumTransaction.map(({ sender, receiver, amount }, index) => (
							<li key={`transaction-${index}`}>
								<span>
									{sender}가 {receiver}에게 {amount}원 보내기
								</span>
							</li>
						))}
					</StyledUl>
				</div>
			)}
		</StyledWrapper>
	);
};

export default SettlementSummary;

const StyledWrapper = styled.div`
	padding: 1.5em;
	background-color: #683ba1;
	color: #fffbfb;
	box-shadow: 3px 0px 4px rgba(0, 0, 0, 0.25);
	border-radius: 15px;
	text-align: center;
	font-size: 20px;
`;

const StyledUl = styled.ul`
	margin-top: 31px;
	font-weight: 600;
	line-height: 200%;
	text-align: left;

	list-style-type: disclosure-closed;
	li::marker {
		animation: blinker 1.5s linear infinite;
	}

	@keyframes blinker {
		50% {
			opacity: 0;
		}
	}
`;

const StyledSummary = styled.div`
	margin-top: 31px;
`;
