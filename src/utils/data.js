// 핸즈온 세션에서 사용할 데이터
// 서버 API 설정
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://dev-fest-server.onrender.com';

// 기본 로컬 데이터 (서버 연결 실패 시 대체용)
export const mySchedule = [
  {
    name: '인공지능 개론',
    day: '월',
    start: '09:00',
    end: '10:30',
    location: '공학관 101호',
  },
  {
    name: '웹 프로그래밍',
    day: '월',
    start: '13:00',
    end: '15:00',
    location: 'IT관 205호',
  },
  {
    name: '데이터베이스',
    day: '화',
    start: '10:00',
    end: '12:00',
    location: '공학관 301호',
  },
  {
    name: '알고리즘',
    day: '수',
    start: '09:00',
    end: '11:00',
    location: 'IT관 401호',
  },
  {
    name: '소프트웨어 공학',
    day: '목',
    start: '14:00',
    end: '16:00',
    location: '공학관 201호',
  },
];

export const constraints = {
  travelTime: 15, // 이동 시간 (분)
  minWorkableSession: 60, // 최소 근무 가능 시간 (분)
  campusHours: {
    start: '09:00', // 캠퍼스 운영 시작 시간
    end: '18:00', // 캠퍼스 운영 종료 시간
  },
};

/**
 * 서버에서 문제 데이터를 가져옵니다
 * @returns {Promise<Object>} - { schedule, constraints, title, rules }
 */
export async function fetchProblemData() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/problem`);
    if (!response.ok) {
      throw new Error('서버에서 문제 데이터를 가져오는데 실패했습니다');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('서버 연결 실패, 로컬 데이터 사용:', error.message);
    // 서버 연결 실패 시 로컬 데이터 반환
    return {
      title: '알바 시간 찾기 미션',
      schedule: mySchedule,
      constraints: constraints,
      rules: [
        '강의 시간과 겹치지 않아야 합니다',
        '강의 전후 이동 시간(15분)을 고려해야 합니다',
        '최소 근무 시간(60분)을 충족해야 합니다',
        '캠퍼스 운영 시간(09:00-18:00) 내여야 합니다',
        '가능한 모든 시간대를 찾아야 합니다',
      ],
    };
  }
}
