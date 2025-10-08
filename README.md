# 🎯 GDG DevFest - 꿀알바 타임 찾기

GDG DevFest 핸즈온 세션을 위한 React 기반 프로젝트입니다.  
AI를 활용하여 대학생의 시간표를 분석하고, 알바 가능한 시간을 자동으로 찾아주는 실습을 진행합니다.

## 📋 프로젝트 개요

이 프로젝트는 **SDD(Specification-Driven Development)와 고급 프롬프팅 전략**을 학습하는 핸즈온 세션입니다.  
참가자들은 명확한 명세서 작성의 중요성과 Gemini의 고도화된 프롬프팅 기법을 경험하며, Google AI를 효과적으로 활용하는 방법을 배웁니다.

### 미션 목표

강의 시간표와 복잡한 제약 조건을 분석하여 **교내 알바가 가능한 시간대**를 찾는 로직을 완성하세요!

⏰ **까다로운 조건**:

- 가능한 알바 시간들 중 **최대로 일할 수 있는 시간**을 골라야 합니다
- 건물 위치에 따른 **이동 시간 차등 적용** (인접 건물 5분, 일반 15분)
- 6가지 복합 규칙을 **모두 만족**해야 합니다

## 🚀 시작하기

### 1. 의존성 설치

```bash
yarn install
```

### 2. 개발 서버 실행

```bash
yarn start
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
│   ├── prompt_sdd.txt           # 1단계: SDD 기반 명세서 프롬프트
│   └── prompt_super.txt         # 2단계: Gemini 고급 프롬프팅
├── index.html
├── package.json
└── vite.config.js
```

## 서버 API 연동

이 프로젝트는 **자동 채점 서버**와 연동되어 있습니다:

- **서버 URL**: `https://dev-fest-server.onrender.com`
- **문제 데이터**: 서버에서 자동으로 가져옵니다
- **자동 채점**: 코드를 제출하면 서버에서 5가지 규칙으로 검증합니다

### API 엔드포인트

- `GET /.netlify/functions/problem` - 문제 데이터 조회
- `POST /.netlify/functions/execute-and-validate` - 코드 제출 및 채점

## 🎓 핸즈온 세션 진행 방법

### Step 0: 프로젝트 시작하기

```bash
yarn install
yarn start
```

브라우저에서 `http://localhost:5173`을 열면 서버에서 문제 데이터를 자동으로 가져옵니다.

### Step 1: 문제 분석 및 명세서 작성 (SDD 접근)

페이지에서 확인할 수 있는 데이터:

- **내 시간표**: 서버에서 제공하는 강의 시간표 (건물 위치 포함)
- **제약 조건**: 이동 시간, 최소 근무 시간, 캠퍼스 운영 시간, 인접 건물 정보

**핵심**: 단순히 코드를 생성하지 말고, 먼저 **상세한 기능 명세서**를 작성하세요!

#### 명세서에 포함되어야 할 내용:

1. **입력 데이터 구조**: schedule 배열의 각 항목 형식
2. **출력 데이터 구조**: 반환해야 할 배열의 형식
3. **비즈니스 규칙 6가지**: 각 규칙의 구체적인 조건
4. **엣지 케이스**: 하루 시작/종료, 연속 강의, 인접 건물 등
5. **우선순위**: 최대 근무 시간 선택 로직

### Step 2: SDD 기반 프롬프트 작성 (Specification-Driven Development)

`prompts/prompt_sdd.txt`의 프롬프트를 Gemini에 입력해보세요:

```bash
# Gemini CLI 사용
gemini "$(cat prompts/prompt_sdd.txt)"
```

또는 [Google AI Studio](https://aistudio.google.com)에서 직접 입력할 수도 있습니다.

**SDD 프롬프트의 특징**:

- ✅ 명확한 입출력 인터페이스 정의
- ✅ 모든 제약 조건을 구조화된 형태로 제시
- ✅ 테스트 케이스 포함
- ✅ 우선순위 명시

생성된 코드를 `src/utils/timeProcessor.js`에 붙여넣고:

1. 파일을 저장합니다
2. 브라우저를 새로고침합니다
3. **"제출하여 채점받기" 버튼을 클릭**하여 서버에서 자동 채점을 받습니다

**예상 결과**:

- 대부분의 규칙을 통과하지만, 일부 복잡한 케이스(인접 건물, 최대 근무 시간)에서 실패 가능

### Step 3: 고도화된 프롬프팅 전략 (Gemini Advanced Prompting)

더 까다로운 조건들을 처리하기 위해 **Gemini의 고도화된 프롬프팅 기법**을 사용하세요.

`prompts/prompt_super.txt`의 프롬프트를 사용:

```bash
# Gemini 2.5 Pro 추천 (복잡한 로직 처리에 강점)
gemini "$(cat prompts/prompt_super.txt)"
```

**Super Prompt의 특징**:

- 🧠 단계적 사고 과정 요청 (Chain of Thought)
- 🔍 엣지 케이스 명시적 나열
- 📊 알고리즘 의사코드 먼저 작성 요청
- 🧪 자체 검증 로직 포함 요청
- 🎯 우선순위 최적화 전략 명시

**프롬프팅 전략**:

1. **역할 부여**: "당신은 시간표 최적화 전문 알고리즘 엔지니어입니다"
2. **사고 과정 요청**: "먼저 문제를 분석하고, 단계별로 접근 방법을 설명하세요"
3. **구체적 제약**: 모든 규칙을 명시하되, 특히 **인접 건물 로직**과 **최대 시간 선택**을 강조
4. **검증 요청**: "생성한 코드가 6가지 규칙을 모두 만족하는지 설명하세요"

생성된 개선된 코드를 적용하고:

1. 파일을 저장합니다
2. 브라우저를 새로고침합니다
3. **"제출하여 채점받기" 버튼을 클릭**하여 서버 채점을 받습니다

**예상 결과**:

- 서버에서 "🎉 미션 성공!" 메시지를 받습니다
- 6가지 복합 규칙을 모두 만족하는 완전한 구현

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
5. 📍 **건물 위치 고려**: 강의가 끝나는 건물(`location`)이 알바 장소와 인접한 경우 이동 시간 단축
6. ⏰ **최대 근무 시간 선택**: 가능한 여러 시간대 중 **최대로 일할 수 있는 시간**을 골라야 함

### 서버 채점 규칙 (6가지)

서버는 다음 6가지 규칙으로 코드를 자동 검증합니다:

1. **Rule #1: 강의 시간 중첩 금지** - 알바 시간이 강의와 겹치지 않아야 함
2. **Rule #2: 이동 시간 준수** - 강의 전후 15분의 이동 시간 필요
3. **Rule #3: 최소 근무 시간** - 알바는 최소 60분 이상
4. **Rule #4: 캠퍼스 활동 시간** - 09:00~18:00 내에만 가능
5. **Rule #5: 완전성** - 가능한 모든 시간대를 빠짐없이 찾아야 함
6. **Rule #6: 옆 건물 찬스! (조건부 규칙)** - 수업이 끝나는 건물이 카페(중앙도서관)와 인접한 경우, 이동 시간이 15분 대신 5분으로 단축됩니다
   - 예: 정보관 수업이 12:00에 끝나면 → 12:05부터 알바 가능
   - 서버만 알고 있는 비즈니스 로직입니다
   - 어려운 이유: AI는 어떤 건물이 서로 인접한지 알지 못합니다

하나라도 실패하면 상세한 피드백과 함께 실패 이유를 알려줍니다!

## 🎯 프롬프트 엔지니어링 학습 포인트

### 전통적 접근의 한계

**문제점**:

- 모호한 요구사항 전달
- 제약 조건의 우선순위 불명확
- 복잡한 비즈니스 로직 누락
- 엣지 케이스 고려 부족

### SDD(Specification-Driven Development) 접근

**장점**:

- 📋 명확한 입출력 인터페이스 정의
- 📐 구조화된 제약 조건 명세
- 🧪 테스트 케이스 기반 개발
- 🎯 우선순위 명시

**핵심 원칙**:

1. 코드 작성 전 상세 명세서 작성
2. 모든 비즈니스 규칙을 문서화
3. 성공/실패 기준 명확히 정의

### 고도화된 프롬프팅 전략 (Gemini Advanced Prompting)

**Gemini에 적용 가능한 고급 기법**:

- 🧠 **Chain of Thought**: 단계별 사고 과정 요청 (Gemini의 강점)
- 🔄 **Self-Verification**: AI가 스스로 검증하도록 요청
- 📊 **Algorithm First**: 의사코드 먼저, 구현은 나중에
- 🎭 **Role-Playing**: 전문가 역할 부여
- 🔍 **Edge Case Enumeration**: 모든 예외 케이스 명시
- 🎯 **Few-Shot Learning**: Gemini는 예시 기반 학습에 뛰어남

**실전 팁**:

```
❌ "알바 가능 시간을 찾는 함수를 만들어줘"
✅ "시간표 최적화 전문가로서, 6가지 복합 규칙을 만족하는 알고리즘을 설계하세요.
    먼저 문제를 분석하고, 각 규칙을 어떻게 처리할지 설명한 후,
    의사코드를 작성하고, 최종적으로 JavaScript 코드를 구현하세요."
```

## 📚 학습 자료

### Gemini CLI 설치

```bash
# Node.js 환경
npm install -g @google/generative-ai-cli

# 또는 npx로 직접 사용
npx @google/generative-ai-cli
```

### Gemini API 키 설정

1. [Google AI Studio](https://aistudio.google.com/app/apikey)에서 API 키 발급
2. 환경 변수 설정:

```bash
export GOOGLE_API_KEY="your-api-key-here"
```

### 추가 학습 리소스

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API 문서](https://ai.google.dev/docs)
- [프롬프트 엔지니어링 가이드](https://ai.google.dev/docs/prompt_best_practices)
- [Gemini 모델 가이드](https://ai.google.dev/models/gemini)

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

4. **"인접 건물 이동 시간을 고려하지 않았습니다"**
   - 강의의 `location` 속성을 확인
   - `constraints.adjacentBuildings` 배열에 해당 건물이 있는지 체크
   - 인접 건물이면 이동 시간을 5분으로, 아니면 15분으로 계산

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

**만든 사람**: [whddltjdwhd](https://github.com/whddltjdwhd)  
**세션명**: Google Gemini로 복잡한 로직 구현하기 - 꿀알바 타임 찾기  
**서버**: https://dev-fest-server.onrender.com  
**Google AI**: [Google AI Studio](https://aistudio.google.com) | [Gemini API](https://ai.google.dev/)
