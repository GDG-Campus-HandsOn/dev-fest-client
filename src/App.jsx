import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  mySchedule,
  constraints,
  fetchProblemData,
  API_BASE_URL,
} from './utils/data.js';
import { findWorkableSlots } from './utils/timeProcessor.js';
import Timetable from './components/Timetable.jsx';
import ResultDisplay from './components/ResultDisplay.jsx';
import './App.css';

function App() {
  const [schedule, setSchedule] = useState(mySchedule);
  const [problemConstraints, setProblemConstraints] = useState(constraints);
  const [workableSlots, setWorkableSlots] = useState([]);
  const [apiResult, setApiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [problemTitle, setProblemTitle] = useState('꿀알바 타임 찾기');
  const [isLoadingProblem, setIsLoadingProblem] = useState(true);

  // 컴포넌트 마운트 시 서버에서 문제 데이터 가져오기
  useEffect(() => {
    async function loadProblem() {
      setIsLoadingProblem(true);
      try {
        const problemData = await fetchProblemData();
        setSchedule(problemData.schedule);
        setProblemConstraints(problemData.constraints);
        setProblemTitle(problemData.title || '꿀알바 타임 찾기');

        // 문제 데이터를 받은 후 알바 가능 시간 계산
        const slots = findWorkableSlots(
          problemData.schedule,
          problemData.constraints
        );
        setWorkableSlots(slots);
      } catch (error) {
        console.error('문제 데이터 로드 실패:', error);
        // 로컬 데이터로 계산
        const slots = findWorkableSlots(mySchedule, constraints);
        setWorkableSlots(slots);
      } finally {
        setIsLoadingProblem(false);
      }
    }

    loadProblem();
  }, []);

  // 제출하여 채점받기
  const handleSubmit = async () => {
    setIsLoading(true);
    setApiResult(null);

    try {
      // findWorkableSlots 함수의 코드를 문자열로 변환
      const functionCode = findWorkableSlots.toString();

      // 서버에 코드 제출
      const response = await axios.post(
        `${API_BASE_URL}/api/execute-and-validate`,
        { code: functionCode },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10초 타임아웃
        }
      );

      // 응답 처리
      const result = response.data;

      setApiResult({
        success: result.status === 'success',
        message: result.message || result.title,
        details: {
          score: result.score,
          failedRule: result.failedRule,
          hint: result.hint,
        },
      });
    } catch (error) {
      console.error('제출 오류:', error);

      let errorMessage = '서버 오류가 발생했습니다.';

      if (error.response) {
        // 서버가 응답했지만 에러 상태
        const errorData = error.response.data;
        errorMessage = errorData.message || errorData.title || errorMessage;

        setApiResult({
          success: false,
          message: errorMessage,
          details: {
            failedRule: errorData.failedRule,
            hint: errorData.hint,
          },
        });
      } else if (error.request) {
        // 요청은 보냈지만 응답이 없음
        errorMessage = '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.';
        setApiResult({
          success: false,
          message: errorMessage,
        });
      } else {
        // 요청 설정 중 에러
        errorMessage = error.message || '알 수 없는 오류가 발생했습니다.';
        setApiResult({
          success: false,
          message: errorMessage,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProblem) {
    return (
      <div className="app-container">
        <div className="app-header">
          <h1>🎯 꿀알바 타임 찾기</h1>
          <p>문제 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>🎯 {problemTitle}</h1>
        <p>GDG DevFest 핸즈온 세션</p>
      </div>

      <div className="content-section">
        <h2 className="section-title">📋 제약 조건</h2>
        <ul
          style={{ fontSize: '1.1rem', lineHeight: '2', paddingLeft: '20px' }}
        >
          <li>
            이동 시간: {problemConstraints.travelTime}분
            {problemConstraints.adjacentBuildings &&
              problemConstraints.adjacentBuildings.length > 0 && (
                <span style={{ color: '#48bb78', fontWeight: 'bold' }}>
                  {' '}
                  (단, {problemConstraints.adjacentBuildings.join(', ')} →
                  중앙도서관은 5분)
                </span>
              )}
          </li>
          <li>최소 근무 시간: {problemConstraints.minWorkableSession}분</li>
          <li>
            캠퍼스 운영 시간: {problemConstraints.campusHours.start} ~{' '}
            {problemConstraints.campusHours.end}
          </li>
          <li>알바 장소: {problemConstraints.workLocation || '중앙도서관'}</li>
        </ul>
      </div>

      <div className="content-section">
        <h2 className="section-title">📚 내 시간표</h2>
        <Timetable schedule={schedule} workableSlots={workableSlots} />
      </div>

      <div className="content-section">
        <h2 className="section-title">✨ 알바 가능 시간</h2>
        <p style={{ marginBottom: '15px', color: '#666', fontSize: '0.95rem' }}>
          ⏰ <strong>미션:</strong> 가능한 알바 시간들 중{' '}
          <span style={{ color: '#e63946', fontWeight: 'bold' }}>
            최대로 일할 수 있는 시간
          </span>
          을 골라야 합니다!
        </p>
        {workableSlots.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', fontSize: '1.1rem' }}>
            아직 계산되지 않았습니다. src/utils/timeProcessor.js 파일의 함수를
            완성해보세요!
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '10px' }}>
            {workableSlots.map((slot, index) => (
              <div
                key={index}
                style={{
                  background: '#e6fffa',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '2px solid #48bb78',
                }}
              >
                <strong>{slot.day}요일</strong>: {slot.start} ~ {slot.end}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || workableSlots.length === 0}
      >
        {isLoading ? '채점 중...' : '제출하여 채점받기'}
      </button>

      {workableSlots.length === 0 && (
        <p
          style={{
            textAlign: 'center',
            color: '#ff6b6b',
            fontSize: '0.9rem',
            marginTop: '10px',
          }}
        >
          ⚠️ 함수를 완성해야 제출할 수 있습니다
        </p>
      )}

      <ResultDisplay result={apiResult} />

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '0.9rem',
        }}
      >
        <p>
          <strong>💡 힌트:</strong>
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>
            <code>src/utils/timeProcessor.js</code> 파일의{' '}
            <code>findWorkableSlots</code> 함수를 완성하세요
          </li>
          <li>완성 후 페이지를 새로고침하면 결과가 자동으로 표시됩니다</li>
          <li>
            "제출하여 채점받기" 버튼을 클릭하면 서버에서 자동으로 채점합니다
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
