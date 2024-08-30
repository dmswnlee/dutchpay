import React, { useState } from "react";
import CenteredOverlayForm from "./CenteredOverlayForm";
import { Button, Container, Form, Row } from "react-bootstrap";
import { InputTags } from "react-bootstrap-tagsinput";
import { useRecoilState, useRecoilValue } from "recoil";
import { groupMembersState } from "../state/groupMembers";
import { groupNameState } from "../state/groupName";

const AddMembers = () => {
	const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
	const groupName = useRecoilValue(groupNameState);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const handleSubmit = event => {
		event.preventDefault();
		setFormSubmitted(true);
	};

	return (
		<CenteredOverlayForm>
			<Container>
				<Form noValidate onSubmit={handleSubmit}>
					{/* <StyledRow> */}
					<Row className="aligin-items-start">
						<h2>{groupName} 그룹에 속한 사람들의 이름을 모두 적어 주세요.</h2>
					</Row>
					<Row className="aligin-items-center">
						<InputTags
							data-testid="input-member-names"
							placeholder="이름 간 띄어 쓰기"
							onTags={value => setGroupMembers(value.values)}
						/>
						{formSubmitted && groupMembers.length === 0 && <span>그룹 멤버들의 이름을 입력해 주세요.</span>}
					</Row>
					<Row className="aligin-items-end">
						<Button type="submit">저장</Button>
					</Row>
					{/* </StyledRow> */}
				</Form>
			</Container>
		</CenteredOverlayForm>
	);
};

export default AddMembers;
