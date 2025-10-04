import React from 'react';

const TimeCell = ({ timeSlot }) => {
  const isFullHour = timeSlot.minute === 0;
  const isHalfHour = timeSlot.minute === 30;
  const type = isFullHour ? 'full-hour' : isHalfHour ? 'half-hour' : 'quarter';

  const renderLabel = () => {
    if (isFullHour) {
      return <span className="time-label-full">{timeSlot.hour}:00</span>;
    }
    if (isHalfHour) {
      return <span className="time-label-half">:30</span>;
    }
    return (
      <span className="time-label-quarter">
        :{timeSlot.minute.toString().padStart(2, '0')}
      </span>
    );
  };

  return <div className={`timetable-time-cell ${type}`}>{renderLabel()}</div>;
};

export default TimeCell;
