import { render, screen } from '@testing-library/react'
import CreateGroup from './CreateGroup'
import userEvent from '@testing-library/user-event'

const renderComponent = () => {
  render(<CreateGroup />)

  // get~ 단순히 보여주는것, 출력하는것, 하나니까 all 아니고 by
  const input =  screen.getByPlaceholderText('2022 제주도 여행')
  const saveButton = screen.getByText('저장')
  const errorMessage = screen.queryByText('그룹 이름을 입력해 주세요.')

  return {
    input,
    saveButton,
    errorMessage
  }
}

describe('그룹 생성 페이지', () => {
  test('그룹 이름 입력 컴포넌트가 렌더링 되는가', () => {
    const {input, saveButton} = renderComponent()

    // todo: input component
    // input 값이 null이 아닐때 이 라인에 있는 테스트가 통과되는 것
    expect(input).not.toBeNull()
    // todo: save button
    expect(saveButton).not.toBeNull()
  })

  test('그룹 이름을 입력하지 않고 "저장" 버튼을 클릭 시, 에러 메세지를 노출한다.', async () => {
    const {saveButton, errorMessage} = renderComponent()
    // 마치 유저가 버튼을 누른것 처럼 이 버튼을 눌렀을 때 발상해는 모든 이벤트!
    await userEvent.click(saveButton)
    expect(errorMessage).not.toBeNull
  })

  // userEvent.type, click 모두 비동기, 타이핑이 다 끝날 때 까지 클릭이 일어나면 안되기때문에 -> async, await
  test('그룹 이름을 입력 후, "저장" 버튼을 클릭 시 저장 성공', async () => {
    const {input, saveButton, errorMessage} = renderComponent()

    await userEvent.type(input, '예시 그룹명')
    await userEvent.click(saveButton)

    expect(errorMessage).toBeNull()
  })
})