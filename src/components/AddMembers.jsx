import React, { useState } from "react";
import CenteredOverlayForm from "./CenteredOverlayForm";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { groupNameState } from "../state/groupName";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { Form } from 'react-bootstrap';

const AddMembers = () => {
	const [groupMembersString, setGroupMembersString] = useState("");
	const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
	const groupName = useRecoilValue(groupNameState);
	const [validated, setValidated] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = event => {
		event.preventDefault();
		setValidated(true);
		if (groupMembers.length > 0) {
			navigate(ROUTES.EXPENSE_MAIN);
		} else if (isSamsungInternet && groupMembersString.length > 0) {
			setGroupMembers(groupMembersString.split(","));
		}
	};

	const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요`;

	const isSamsungInternet = window.navigator.userAgent.includes("SAMSUNG");

	return (
		<CenteredOverlayForm title={header} validated={validated} handleSubmit={handleSubmit}>
			{/* TODO: InputTags가 동작하지 않는 환경에서, 이름 값을 ,를 구분자로 해서 받는다. */}
			{isSamsungInternet ? (
				<Form.Control
					placeholder="이름 간 컴마(,)로 구분"
					onChange={({ target }) => setGroupMembersString(target.value)}
				/>
			) : (
				<InputTags
					values={groupMembers}
					data-testid="input-member-names"
					placeholder="이름 간 띄어 쓰기"
					onTags={value => setGroupMembers(value.values)}
				/>
			)}
			{validated && groupMembers.length === 0 && (
				<StyledErrorMessage>그룹 멤버들의 이름을 입력해 주세요.</StyledErrorMessage>
			)}
		</CenteredOverlayForm>
	);
};

export default AddMembers;

const StyledErrorMessage = styled.span`
	color: red;
`;
