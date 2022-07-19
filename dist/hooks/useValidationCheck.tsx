import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { ValidationOptions } from "../types/nickname";

export default function useValidationCheck(obj: ValidationOptions) {
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/;
  const regExpNull = /\s/;
  const LINE_FEED = 10;

  const inputRef = useRef<HTMLInputElement>(null);
  const [warningText, setWarningText] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");

  useLayoutEffect(() => {
    if (warningText === obj?.clearText) setTextColor("blue");
    else setTextColor("red");
  }, [warningText]);

  // -- 만약 byte 로 계산한다 했을 떄 필요한 함수들 --
  const getByteLength = (decimal: number): number => {
    return decimal >> 7 || LINE_FEED === decimal ? 2 : 1;
  };

  const getByte = (str: string): number => {
    return str
      .split("")
      .map((s) => s.charCodeAt(0))
      .reduce(
        (prev, unicodeDecimalValue) =>
          prev + getByteLength(unicodeDecimalValue),
        0
      );
  };
  // -- 만약 byte 로 계산한다 했을 떄 필요한 함수들 --

  const checkAPI = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 400);
    });
  };

  const checkLength = (param: string) => {
    switch (obj?.length) {
      case "pure":
        if (param.length < (obj?.minPureLen ? obj?.minPureLen : 0)) {
          if (obj?.minPureText) setWarningText(obj.minPureText);
          return false;
        } else if (
          param.length >
          (obj.maxPureLen ? obj.maxPureLen : Number.MAX_SAFE_INTEGER)
        ) {
          if (obj?.maxPureText) setWarningText(obj.maxPureText);
          return false;
        } else {
          return true;
        }
      case "byte":
        if (getByte(param) < (obj?.minByteLen ? obj?.minByteLen : 0)) {
          if (obj?.minByteText) setWarningText(obj.minByteText);
          return false;
        } else if (
          getByte(param) >
          (obj?.maxByteLen ? obj?.maxByteLen : Number.MAX_SAFE_INTEGER)
        ) {
          if (obj?.maxByteText) setWarningText(obj.maxByteText);
          return false;
        } else return true;
      default:
        return true;
    }
  };

  const checkNickname = async (param: string): Promise<boolean> => {
    if (obj.length !== null && !checkLength(param)) {
      return false;
    } else if (regExpNull.test(param)) {
      setWarningText("이름에 공백을 사용할 수 없습니다.");
      return false;
    } else if (regExp.test(param)) {
      setWarningText("특수문자를 사용할 수 없습니다.");
      return false;
    }

    const response = await checkAPI();
    if (response) {
      setWarningText(obj?.duplicatedErrorText || "");
      return false;
    } else {
      setWarningText(obj?.clearText || "");
      return true;
    }
  };
  let typingTimer: ReturnType<typeof setTimeout>;

  const checkLogics = (e: Event) => {
    const target = e.target as HTMLInputElement;
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      clearTimeout(typingTimer);
      if (!checkNickname(target?.value)) return;
    }, obj.intervalTime);
  };

  useEffect(() => {
    inputRef?.current?.addEventListener("keyup", checkLogics);
    inputRef?.current?.addEventListener("keydown", () => {
      clearTimeout(typingTimer);
    });

    return () => {
      inputRef?.current?.removeEventListener("keyup", checkLogics);
      inputRef?.current?.removeEventListener("keydown", () => {
        clearTimeout(typingTimer);
      });
    };
  }, []);

  return { inputRef, textColor, warningText, setWarningText };
}
