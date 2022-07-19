export type ValidationOptions = {
  length?: "pure" | "byte" | null; // pure || byte || 안적어주면 자동으로 null
  minPureLen?: number; // length가 null 이 아닐 경우에만 체크
  maxPureLen?: number; // length가 null 이 아닐 경우에만 체크
  minPureText?: string; // length가 null 이 아닐 경우에만
  maxPureText?: string; // length가 null 이 아닐 경우에만
  minByteLen?: number; // length가 null 이 아닐 경우에만 체크
  maxByteLen?: number; // length가 null 이 아닐 경우에만 체크
  minByteText?: string; // length가 null 이 아닐 경우에만
  maxByteText?: string; // length가 null 이 아닐 경우에만
  intervalTime: number;
  clearText?: string;
  duplicatedErrorText?: string;
};

export type Props = {
  obj: ValidationOptions;
};

export type InputsType = {
  nickname: string;
};
