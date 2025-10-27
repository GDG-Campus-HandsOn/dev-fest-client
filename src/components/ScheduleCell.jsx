import React from 'react';
import { ClassCard, SlotCard } from './ScheduleCard';

const ScheduleCell = ({
  classes,
  slots,
  classStarts,
  slotStarts,
  timeSlot,
}) => {
  const getCellClass = () => {
    const hasBoth = classes.length > 0 && slots.length > 0;
    const hasClass = classes.length > 0;
    const hasSlot = slots.length > 0;

    // 시간에 따른 높이 클래스 결정
    const isFullHour = timeSlot.minute === 0;
    const isHalfHour = timeSlot.minute === 30;
    const isQuarterStart = timeSlot.minute === 15 || timeSlot.minute === 45;

    let sizeClass = 'quarter'; // 기본: 5분 단위 작은 셀
    if (isFullHour) {
      sizeClass = 'full-hour';
    } else if (isHalfHour) {
      sizeClass = 'half-hour';
    } else if (isQuarterStart) {
      sizeClass = 'quarter-start';
    }

    let baseClass = `timetable-cell ${sizeClass}`;

    if (hasBoth) return `${baseClass} has-both`;
    if (hasClass) return `${baseClass} has-class`;
    if (hasSlot) return `${baseClass} has-slot`;
    return baseClass;
  };

  return (
    <div className={getCellClass()}>
      {classStarts && <ClassCard classItem={classStarts} />}
      {slotStarts && <SlotCard slotItem={slotStarts} />}
    </div>
  );
};

export default ScheduleCell;
