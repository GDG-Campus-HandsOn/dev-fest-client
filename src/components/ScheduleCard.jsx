import React from 'react';

export const ClassCard = ({ classItem }) => {
  return (
    <div className="class-item">
      <div className="item-name">{classItem.name}</div>
      <div className="item-time">
        {classItem.start} - {classItem.end}
      </div>
    </div>
  );
};

export const SlotCard = ({ slotItem }) => {
  return (
    <div className="slot-item">
      <div className="item-label">알바</div>
      <div className="item-time">
        {slotItem.start} - {slotItem.end}
      </div>
    </div>
  );
};
