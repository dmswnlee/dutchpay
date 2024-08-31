import React, { useState } from "react";
import CenteredOverlayForm from "./CenteredOverlayForm";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { groupNameState } from "../state/groupName";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

const AddMembers = () => {
	const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
	const groupName = useRecoilValue(groupNameState);
	const [validated, setValidated] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = event => {
		event.preventDefault();
		setValidated(true);
		if (groupMembers.length > 0) {
			navigate(ROUTES.EXPENSE_MAIN);
		}
	};

	const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요`;

	return (
		<CenteredOverlayForm title={header} validated={validated} handleSubmit={handleSubmit}>
			<InputTags
				data-testid="input-member-names"
				placeholder="이름 간 띄어 쓰기"
				onTags={value => setGroupMembers(value.values)}
			/>
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
