# 🎯 GDG DevFest - 꿀알바 타임 찾기

GDG DevFest 핸즈온 세션을 위한 React 기반 프로젝트입니다.  
AI를 활용하여 대학생의 시간표를 분석하고, 알바 가능한 시간을 자동으로 찾아주는 실습을 진행합니다.

## 📋 프로젝트 개요

이 프로젝트는 **Gemini CLI를 활용한 프롬프트 엔지니어링**을 학습하는 핸즈온 세션입니다.  
참가자들은 단순한 프롬프트와 고급 프롬프트의 차이를 경험하며, AI를 효과적으로 활용하는 방법을 배웁니다.

### 미션 목표
강의 시간표와 제약 조건을 분석하여 **교내 알바가 가능한 시간대**를 찾는 로직을 완성하세요!

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 확인하세요.

## 📁 프로젝트 구조

```
handson/
├── src/
│   ├── components/
│   │   ├── Timetable.jsx       # 시간표 UI 컴포넌트
│   │   └── ResultDisplay.jsx   # 결과 표시 컴포넌트
│   ├── utils/
│   │   ├── data.js              # 시간표 및 제약조건 데이터
│   │   └── timeProcessor.js     # ⭐️ 여기를 완성하세요!
│   ├── App.jsx                  # 메인 App 컴포넌트
│   ├── App.css                  # 전역 스타일
│   └── main.jsx                 # React 진입점
├── prompts/
│   ├── prompt_naive.txt         # 1단계: 단순 프롬프트
│   └── prompt_smart.txt         # 2단계: 고급 프롬프트
├── index.html
├── package.json
└── vite.config.js
```

## � 서버 API 연동

이 프로젝트는 **자동 채점 서버**와 연동되어 있습니다:
- **서버 URL**: `https://dev-fest-server.onrender.com`
- **문제 데이터**: 서버에서 자동으로 가져옵니다
- **자동 채점**: 코드를 제출하면 서버에서 5가지 규칙으로 검증합니다

### API 엔드포인트
- `GET /.netlify/functions/problem` - 문제 데이터 조회
- `POST /.netlify/functions/execute-and-validate` - 코드 제출 및 채점

## �🎓 핸즈온 세션 진행 방법

### Step 0: 프로젝트 시작하기
```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`을 열면 서버에서 문제 데이터를 자동으로 가져옵니다.

### Step 1: 문제 이해하기
페이지에서 확인할 수 있는 데이터:
- **내 시간표**: 서버에서 제공하는 강의 시간표
- **제약 조건**: 이동 시간, 최소 근무 시간, 캠퍼스 운영 시간

### Step 2: 단순 프롬프트로 시도 (Naive Approach)
`prompts/prompt_naive.txt`의 프롬프트를 Gemini CLI에 입력해보세요:

```bash
gemini "$(cat prompts/prompt_naive.txt)"
```

생성된 코드를 `src/utils/timeProcessor.js`의 `findWorkableSlots` 함수에 붙여넣고:
1. 파일을 저장합니다
2. 브라우저를 새로고침합니다
3. 결과를 확인합니다
4. **"제출하여 채점받기" 버튼을 클릭**하여 서버에서 자동 채점을 받습니다

**예상 결과**: 
- 로컬에서는 결과가 보이지만, 서버 채점에서 실패 메시지를 받습니다
- 단순히 공강 시간만 찾고, 제약 조건은 고려하지 않은 불완전한 코드

### Step 3: 고급 프롬프트로 개선 (Smart Approach)
`prompts/prompt_smart.txt`의 프롬프트를 Gemini CLI에 입력해보세요:

```bash
gemini "$(cat prompts/prompt_smart.txt)"
```

AI가 역으로 질문하면, 페이지에 표시된 제약 조건을 참고하여 답변하세요:
- 이동 시간: 15분
- 최소 근무 시간: 60분
- 캠퍼스 운영 시간: 09:00-18:00

생성된 개선된 코드를 적용하고:
1. 파일을 저장합니다
2. 브라우저를 새로고침합니다
3. **"제출하여 채점받기" 버튼을 클릭**하여 서버 채점을 받습니다

**예상 결과**: 
- 서버에서 "🎉 미션 성공!" 메시지를 받습니다
- 이동 시간, 최소 근무 시간 등을 고려한 완전한 결과

## 🧩 완성해야 할 함수

`src/utils/timeProcessor.js`의 `findWorkableSlots` 함수를 완성하세요:

```javascript
export function findWorkableSlots(schedule, constraints) {
  // ⭐️ 여기에 로직을 작성하세요!
  // 반환 형식: [{ day: '월', start: '10:30', end: '12:45' }, ...]
  return [];
}
```

### 작동 방식
1. **로컬 실행**: 함수를 수정하고 저장하면 브라우저에 즉시 반영됩니다
2. **서버 채점**: "제출하여 채점받기" 버튼을 클릭하면:
   - 함수 코드가 서버로 전송됩니다
   - 서버의 isolated-vm 샌드박스에서 안전하게 실행됩니다
   - 5가지 규칙으로 자동 채점됩니다
   - 실시간 피드백을 받습니다

### 고려사항
1. 요일별로 강의 시간 정리
2. 캠퍼스 운영 시간 내에서 공강 시간 찾기
3. 강의 전후 이동 시간(`travelTime`) 고려
4. 최소 근무 가능 시간(`minWorkableSession`) 충족 여부 확인

### 서버 채점 규칙 (5가지)
서버는 다음 5가지 규칙으로 코드를 자동 검증합니다:

1. **Rule #1: 강의 시간 중첩 금지** - 알바 시간이 강의와 겹치지 않아야 함
2. **Rule #2: 이동 시간 준수** - 강의 전후 15분의 이동 시간 필요
3. **Rule #3: 최소 근무 시간** - 알바는 최소 60분 이상
4. **Rule #4: 캠퍼스 활동 시간** - 09:00~18:00 내에만 가능
5. **Rule #5: 완전성** - 가능한 모든 시간대를 빠짐없이 찾아야 함

하나라도 실패하면 상세한 피드백과 함께 실패 이유를 알려줍니다!

## 🎯 프롬프트 엔지니어링 학습 포인트

### Naive 프롬프트의 문제점
- 맥락(Context) 부족
- 제약 조건 미제공
- 단순 명령형 지시

### Smart 프롬프트의 장점
- 역할 부여 (Role Assignment)
- 대화형 접근 (Interactive)
- 명확한 제약 조건 제시
- 단계적 사고 유도

## 📚 학습 자료

### Gemini CLI 설치
```bash
# 설치 방법은 GDG DevFest 세션 자료를 참고하세요
```

### 추가 학습 리소스
- [Google AI Studio](https://makersuite.google.com/)
- [프롬프트 엔지니어링 가이드](https://developers.google.com/machine-learning/resources/prompt-eng)

## 🤝 기여하기

이 프로젝트는 교육 목적으로 제작되었습니다.  
개선 아이디어가 있다면 이슈를 등록하거나 PR을 보내주세요!

## 📄 라이선스

MIT License

## 🔍 테스트 및 디버깅

### 로컬에서 테스트
```javascript
// src/utils/timeProcessor.js에서 함수 작성 후
// 브라우저 콘솔에서 확인
console.log(workableSlots);
```

### 서버 채점 결과 해석
- **✅ 성공**: 모든 규칙을 통과했습니다!
- **❌ 실패**: 실패한 규칙과 힌트가 표시됩니다
  - 규칙 이름 확인 (예: RULE_TRAVEL_TIME)
  - 힌트 메시지를 참고하여 수정
  - 다시 제출

### 자주 발생하는 문제
1. **"이동 시간을 고려하지 않았습니다"**
   - 강의 종료 시간에 `travelTime`을 더하고
   - 다음 강의 시작 시간에서 `travelTime`을 빼야 합니다

2. **"최소 근무 시간을 충족하지 않았습니다"**
   - 알바 시간대가 `minWorkableSession`(60분) 이상인지 확인

3. **"모든 가능한 시간대를 찾지 못했습니다"**
   - 각 요일별로 모든 공강 시간을 탐색했는지 확인
   - 하루의 마지막 강의 후 시간도 확인

## 🎉 세션 완료 후

1. GitHub Classroom으로 제출
2. 다른 참가자들의 접근 방법 비교
3. 프롬프트 차이가 결과에 미치는 영향 토론
4. 서버 채점 결과 공유 및 토론

## 🛠️ 기술 스택

- **Frontend**: React 18, Vite
- **Backend**: Render (Serverless Functions)
- **자동 채점**: isolated-vm 기반 코드 실행 엔진
- **API**: RESTful API (Axios)

---

**만든 사람**: GDG DevFest Team  
**세션명**: AI를 활용한 스마트 코딩 - 꿀알바 타임 찾기  
**서버**: https://dev-fest-server.onrender.com
