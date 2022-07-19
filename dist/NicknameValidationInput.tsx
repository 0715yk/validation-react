import React, { useState } from "react";
import useValidationCheck from "./hooks/useValidationCheck";
import { InputsType, Props } from "./types/nickname";

const NicknameValidationInput = ({ obj }: Props) => {
  const [inputs, setInputs] = useState<InputsType>({
    nickname: "",
  });
  const { nickname } = inputs;

  const { inputRef, textColor, warningText, setWarningText } =
    useValidationCheck(obj);

  const changeInputs: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    setWarningText("");
    setInputs((prev) => {
      return {
        ...prev,
        [target?.name]: target?.value,
      };
    });
  };

  return (
    <div>
      <span style={{ color: textColor, marginBottom: "5px" }}>
        {warningText}
      </span>
      <br />
      <input
        ref={inputRef}
        name="nickname"
        type="text"
        autoComplete={"off"}
        onChange={changeInputs}
        value={nickname}
      />
      <br />
      <button
        // onClick={() => {
        //   if (Math.round(Math.random() * 1) === 1)
        //     setWarningText("동일한 이름이 존재합니다.");
        //   else alert("입장 완료");
        // }}
        style={{
          color: "white",
          backgroundColor: warningText === obj?.clearText ? "black" : "grey",
        }}
      >
        입장하기
      </button>
    </div>
  );
};

export default NicknameValidationInput;

// 3) 이걸 좀더 모듈화 할 방법을 생각하고, 코드 간단하게 + 객체 지향 + RTK로 만들어놓기
// 4) UI 예비로 input/error message/입장하기 버튼 component 정도만 만들어놓기

// 백엔드 로컬 서버 만들기

// 직무 선택창 만들기
// UI 대략적으로 만들기 + 디폴트로 하나 선택돼있기 때문에 입장하기 버튼이랑은 상관 X
// 하지만 입장하기 버튼 누를 때 보내는 api에 이 정보가 들어가긴 해야함
