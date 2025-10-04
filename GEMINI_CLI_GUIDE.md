# Gemini CLI 프로젝트 자동 생성 가이드

이 파일은 **Gemini CLI만을 사용하여** 이 프로젝트를 처음부터 자동으로 생성하는 방법을 담고 있습니다.

## 🎯 목표
React 프로젝트의 모든 파일을 Gemini CLI 명령어와 프롬프트만으로 생성하는 "AI로 AI 교육 자료 만들기" 실험

## 📋 사전 준비

```bash
# 1. 새 폴더 생성 및 이동
mkdir gdg-devfest-react-mission
cd gdg-devfest-react-mission

# 2. Gemini CLI 인증 확인
gemini auth status
```

## 🚀 단계별 생성 명령어

### Step 1: 폴더 구조 생성

```bash
mkdir -p public src/components src/utils prompts
touch index.html vite.config.js src/main.jsx src/App.css
```

### Step 2: package.json 생성

```bash
gemini "Vite를 사용하는 React 프로젝트의 package.json 파일을 생성해줘. dependencies에는 react, react-dom, axios를 포함하고, devDependencies에는 vite와 @vitejs/plugin-react를 포함해줘. scripts에는 dev, build, preview를 넣어줘." > package.json
```

### Step 3: vite.config.js 생성

```bash
gemini "Vite와 React를 위한 표준 vite.config.js 파일을 생성해줘. @vitejs/plugin-react 플러그인을 import하고 사용하는 코드를 포함해줘." > vite.config.js
```

### Step 4: index.html 생성

```bash
gemini "Vite 기반 React 프로젝트의 public 폴더에 들어갈 기본적인 index.html 파일을 생성해줘. body 안에 id가 'root'인 div를 포함하고, 'src/main.jsx'를 type='module'로 불러오는 script 태그를 포함해줘." > index.html
```

### Step 5: src/main.jsx 생성

```bash
gemini "React 18 프로젝트의 진입점 파일인 main.jsx를 생성해줘. react-dom/client를 사용해서 id가 'root'인 DOM 노드에 App 컴포넌트를 렌더링하는 코드를 작성해줘. App.css도 import 해줘." > src/main.jsx
```

### Step 6: src/utils/data.js 생성

```bash
gemini "핸즈온 세션에서 사용할 데이터 파일을 생성해줘. mySchedule 객체 배열과 constraints 객체를 export 해야 해. mySchedule에는 name, day, start, end, location을 포함하는 강의 객체 5개를 넣어줘. constraints 객체에는 travelTime: 15, minWorkableSession: 60, campusHours: { start: '09:00', end: '18:00' }를 포함해줘." > src/utils/data.js
```

### Step 7: src/utils/timeProcessor.js 생성 ⭐️

```bash
gemini "findWorkableSlots 라는 이름의 함수를 export하는 자바스크립트 파일을 생성해줘. 이 함수는 schedule과 constraints를 인자로 받아. 중요한 것은, 함수 본문은 비워두고 '// 참가자가 채워야 할 로직' 이라는 주석만 남겨줘. 기본 반환값은 빈 배열([])이어야 해." > src/utils/timeProcessor.js
```

### Step 8: src/App.css 생성

```bash
gemini "모던하고 깔끔한 느낌의 CSS 코드를 작성해줘. 전체 페이지는 중앙 정렬하고, 기본적인 폰트와 배경색을 지정해줘. 버튼 스타일도 보기 좋게 만들어줘." > src/App.css
```

### Step 9: src/components/Timetable.jsx 생성

```bash
gemini "React 컴포넌트 'Timetable.jsx'를 생성해줘. props로 schedule과 workableSlots 배열을 받아. 주간 시간표 형태로 렌더링하는데, schedule 항목은 파란색으로, workableSlots 항��은 초록색으로 표시해줘. CSS 스타일링도 코드 안에 포함해서 보기 좋게 만들어줘." > src/components/Timetable.jsx
```

### Step 10: src/components/ResultDisplay.jsx 생성

```bash
gemini "React 컴포넌트 'ResultDisplay.jsx'를 생성해줘. props로 result 객체({ success, message })를 받아. success가 true이면 메시지를 초록색으로, false이면 빨간색으로 표시해줘. 메시지가 없을 때는 아무것도 렌더링하지 마." > src/components/ResultDisplay.jsx
```

### Step 11: src/App.jsx 생성

```bash
gemini "모든 것을 종합하는 메인 React 컴포넌트 'App.jsx'를 생성해줘. 다음 기능을 모두 포함해야 해:
1. useState를 사용해서 workableSlots와 apiResult 상태를 관리.
2. data.js에서 mySchedule과 constraints를 import.
3. timeProcessor.js에서 findWorkableSlots를 import하고, 이 함수를 호출해서 workableSlots 상태를 업데이트.
4. Timetable과 ResultDisplay 컴포넌트를 import해서 렌더링.
5. '제출하여 채점받기' 버튼이 있고, 클릭하면 axios.post를 사용해 '/api/validate' 엔드포인트로 workableSlots 상태를 전송하는 handleSubmit 함수를 실행.
6. 서버 응답을 apiResult 상태에 저장." > src/App.jsx
```

### Step 12: 프롬프트 파일 생성

```bash
# Naive 프롬프트
echo "강의 시간표(schedule) 배열이 주어졌을 때, 강의가 없는 '공강' 시간대를 찾아서 시작 시간과 종료 시간을 객체로 묶어 배열로 반환하는 자바스크립트 함수를 만들어 줘." > prompts/prompt_naive.txt

# Smart 프롬프트
echo "너는 지금부터 대학생의 시간 관리를 도와주는 전문 컨설턴트야. 내 시간표와 제약 조건을 바탕으로 교내 알바가 가능한 시간을 찾는 자바스크립트 함수를 만들고 싶어. 완벽한 함수를 위해, 코드를 짜기 전에 먼저 이동 시간, 최소 근무 단위, 하루의 시작/종료 시간 같은 현실적인 제약 조건들을 어떻게 처리할지 나에게 역으로 질문해줘." > prompts/prompt_smart.txt
```

### Step 13: README.md 생성

```bash
gemini "GDG DevFest 핸즈온 세션용 README.md를 작성해줘. 프로젝트 제목은 '꿀알바 타임 찾기'야. 프로젝트 설명, 설치 방법, 실행 방법, 핸즈온 진행 방법(naive vs smart 프롬프트 비교), 폴더 구조 설명을 포함해줘. 이모지를 적절히 사용해서 보기 좋게 만들어줘." > README.md
```

## ✅ 최종 확인

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
open http://localhost:5173
```

## 💡 주요 인사이트

### 성공 요인
1. **명확한 스펙 제시**: 필요한 기능과 형식을 구체적으로 명시
2. **파일 역할 정의**: 각 파일이 담당할 책임을 분명히 설명
3. **의존성 명시**: import/export 관계를 명확히 지시
4. **출력 형식 지정**: 반환 타입, 객체 구조 등을 정확히 전달

### 한계점
1. **파일 간 일관성**: 수동으로 확인 필요
2. **버전 호환성**: 생성된 코드의 라이브러리 버전 체크
3. **복잡한 로직**: 비즈니스 로직은 여전히 개발자가 검증해야 함

### 개선 방향
1. **멀티턴 대화**: 생성 후 리뷰 및 개선 프롬프트 추가
2. **예제 제공**: 입출력 예시를 프롬프트에 포함
3. **검증 자동화**: 생성된 코드를 자동으로 테스트하는 스크립트

## 🎯 교육적 가치

이 과정을 통해 다음을 배울 수 있습니다:

1. **AI 도구의 활용**: 반복적인 작업 자동화
2. **프롬프트 엔지니어링**: 효과적인 지시 방법
3. **프로젝트 구조화**: 모듈화된 프로젝트 설계
4. **메타 인지**: AI로 AI 교육 자료를 만드는 재귀적 사고

---

**Created with**: Gemini CLI  
**Philosophy**: AI를 활용하여 AI 교육을 만드는 메타 접근법
