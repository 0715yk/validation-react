import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

const NicknameValidationInput = ({
  obj,
  dummyNicknames = []
}) => {
  const [warningText, setWarningText] = useState("");
  const [textColor, setTextColor] = useState("");
  const [inputs, setInputs] = useState({
    nickname: "",
    preferedPosition: ""
  });
  const {
    nickname,
    preferedPosition
  } = inputs;
  const inputRef = useRef(null);
  let typingTimer;

  const changeInputs = e => {
    if (e.target.value.at(-1) === " " || e.target.value.replace(/ /g, "").length !== e.target.value.length) {
      setWarningText("이름에 공백을 사용할 수 없습니다.");
      return;
    } else {
      setWarningText("");
      setInputs(prev => {
        return { ...prev,
          [e.target.name]: e.target.value
        };
      });
    }
  };

  useLayoutEffect(() => {
    if (warningText === "사용하기에 좋은 이름입니다.") setTextColor("blue");else setTextColor("red");
  }, [warningText]);
  const LINE_FEED = 10;

  function getByteLength(decimal) {
    return decimal >> 7 || LINE_FEED === decimal ? 2 : 1;
  }

  function getByte(str) {
    return str.split("").map(s => s.charCodeAt(0)).reduce((prev, unicodeDecimalValue) => prev + getByteLength(unicodeDecimalValue), 0);
  }

  const checkLength = param => {
    switch (obj?.length) {
      case "pure":
        if (param.length < obj?.minPureLen) {
          setWarningText(obj?.minPureText);
          return false;
        } else if (param.length > obj?.maxPureLen) {
          setWarningText(obj?.maxPureText);
          return false;
        } else {
          return true;
        }

      case "byte":
        if (getByte(param.length) < obj?.minByteLen) {
          setWarningText(obj?.minByteText);
          return false;
        } else if (getByte(param.length) > obj?.maxByteLen) {
          setWarningText(obj?.maxByteText);
          return false;
        } else {
          return true;
        }

      default:
        return true;
    }
  };

  const checkNickname = param => {
    if (obj.length !== null && !checkLength(param)) {
      return false;
    }

    return true;
  }; // else {
  //   const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  //   if (special_pattern.test(param) === true) {
  //     setWarningText("특수문자를 사용할 수 없습니다.");
  //     return false;
  //   }
  // }


  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.addEventListener("keyup", e => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          clearTimeout(typingTimer);
          if (!checkNickname(e.target.value)) return;

          if (dummyNicknames.includes(e.target.value)) {
            setWarningText("동일한 이름이 존재합니다.");
          } else {
            setWarningText("사용하기에 좋은 이름입니다.");
          }
        }, 700);
      });
      inputRef.current.addEventListener("keydown", e => {
        clearTimeout(typingTimer);
      });
      return () => {
        inputRef.current.removeEventListener("keyup", e => {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(() => console.log("api"), 700);
        });
        inputRef.current.removeEventListener("keydown", e => {
          clearTimeout(typingTimer);
        });
      };
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: textColor,
      marginBottom: "5px"
    }
  }, warningText), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    name: "nickname",
    type: "text",
    onChange: changeInputs,
    value: nickname,
    autoComplete: "off"
  }));
};

export default NicknameValidationInput;