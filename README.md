### 유효성 검사 로직

#### 닉네임(우선 순위 순서대로)

##### 길이 제한

- 닉네임 길이 제한시 타입 설정이 가능한데 이 때 타입은
  - pure type : 순수 글자수로 제한하는 방법
  - byte type : 5 byte 이내 이런식으로 byte 단위로 제한하는 방법
- 닉네임 길이 제한은 min[[type name]]Len & max[[type name]]Len 로 구분 ex) pure type -> minPureLen & maxPureLen
- 닉네임 길이 제한에 따른 에러 문구는 min[[type name]]Text & max[[type name]]Text로 구분 ex) byte type -> minByteText & maxByteText

##### 특수 문자 및 공백 등 사용 여부
