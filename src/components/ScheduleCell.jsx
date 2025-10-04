import React from 'react';
import { ClassCard, SlotCard } from './ScheduleCard';

const ScheduleCell = ({ classes, slots, classStarts, slotStarts }) => {
  const getCellClass = () => {
    const hasBoth = classes.length > 0 && slots.length > 0;
    const hasClass = classes.length > 0;
    const hasSlot = slots.length > 0;

    if (hasBoth) return 'timetable-cell has-both';
    if (hasClass) return 'timetable-cell has-class';
    if (hasSlot) return 'timetable-cell has-slot';
    return 'timetable-cell';
  };

  return (
    <div className={getCellClass()}>
      {classStarts && <ClassCard classItem={classStarts} />}
      {slotStarts && <SlotCard slotItem={slotStarts} />}
    </div>
  );
};

export default ScheduleCell;
