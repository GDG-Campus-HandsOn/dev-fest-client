import React from 'react';
import TimeCell from './TimeCell';
import ScheduleCell from './ScheduleCell';
import {
  generateTimeSlots,
  getItemsForDayAndTime,
  findItemStartingAt,
} from '../utils/timeUtils';
import './Timetable.css';

const Timetable = ({ schedule, workableSlots }) => {
  const days = ['월', '화', '수', '목', '금'];
  const timeSlots = generateTimeSlots();

  const renderScheduleCell = (day, timeSlot, nextTimeValue) => {
    const { classes, slots } = getItemsForDayAndTime(
      schedule,
      workableSlots,
      day,
      timeSlot.timeValue,
      nextTimeValue
    );

    const classStarts = findItemStartingAt(classes, timeSlot.timeValue);
    const slotStarts = findItemStartingAt(slots, timeSlot.timeValue);

    return (
      <ScheduleCell
        key={`${day}-${timeSlot.display}`}
        classes={classes}
        slots={slots}
        classStarts={classStarts}
        slotStarts={slotStarts}
        timeSlot={timeSlot}
      />
    );
  };

  return (
    <div className="timetable-container">
      <div className="timetable-grid">
        {/* 헤더 */}
        <div className="timetable-header-cell">시간</div>
        {days.map((day) => (
          <div key={day} className="timetable-header-cell">
            {day}
          </div>
        ))}

        {/* 시간표 본문 */}
        {timeSlots.map((timeSlot, index) => {
          const nextTimeValue =
            index < timeSlots.length - 1
              ? timeSlots[index + 1].timeValue
              : timeSlot.timeValue + 15;

          return (
            <React.Fragment key={timeSlot.display}>
              <TimeCell timeSlot={timeSlot} />
              {days.map((day) =>
                renderScheduleCell(day, timeSlot, nextTimeValue)
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Timetable;
