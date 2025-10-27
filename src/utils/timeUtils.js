export const timeToMinutes = (timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  return hour * 60 + minute;
};

export const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      slots.push({
        hour,
        minute,
        display: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        timeValue: hour * 60 + minute,
      });
    }
  }
  // 마지막 18:00 추가
  slots.push({ hour: 18, minute: 0, display: '18:00', timeValue: 18 * 60 });
  return slots;
};

export const isItemInTimeRange = (item, day, timeValue, nextTimeValue) => {
  if (item.day !== day) return false;
  const startTime = timeToMinutes(item.start);
  const endTime = timeToMinutes(item.end);
  return startTime < nextTimeValue && endTime > timeValue;
};

export const getItemsForDayAndTime = (
  schedule,
  workableSlots,
  day,
  timeValue,
  nextTimeValue
) => {
  const classes = schedule.filter((item) =>
    isItemInTimeRange(item, day, timeValue, nextTimeValue)
  );
  const slots = (workableSlots || []).filter((item) =>
    isItemInTimeRange(item, day, timeValue, nextTimeValue)
  );
  return { classes, slots };
};

export const findItemStartingAt = (items, timeValue) => {
  return items.find((item) => timeToMinutes(item.start) === timeValue);
};
