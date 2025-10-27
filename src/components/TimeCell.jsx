import React from 'react';

const TimeCell = ({ timeSlot }) => {
  const isFullHour = timeSlot.minute === 0;
  const isHalfHour = timeSlot.minute === 30;
  const isQuarterStart = timeSlot.minute === 15 || timeSlot.minute === 45;

  let type = 'quarter'; // 기본: 5분 단위 작은 셀
  if (isFullHour) {
    type = 'full-hour'; // 정각: 큰 셀
  } else if (isHalfHour) {
    type = 'half-hour'; // 30분: 중간 셀
  } else if (isQuarterStart) {
    type = 'quarter-start'; // 15분, 45분: 중간 셀
  }

  const renderLabel = () => {
    if (isFullHour) {
      return <span className="time-label-full">{timeSlot.hour}:00</span>;
    }
    if (isHalfHour) {
      return <span className="time-label-half">:30</span>;
    }
    if (isQuarterStart) {
      return (
        <span className="time-label-quarter">
          :{timeSlot.minute.toString().padStart(2, '0')}
        </span>
      );
    }
    return (
      <span
        className="time-label-quarter"
        style={{ fontSize: '0.6rem', opacity: 0.5 }}
      >
        :{timeSlot.minute.toString().padStart(2, '0')}
      </span>
    );
  };

  return <div className={`timetable-time-cell ${type}`}>{renderLabel()}</div>;
};

export default TimeCell;
