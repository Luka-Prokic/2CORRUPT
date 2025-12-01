export function isToday(date?: Date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate.toDateString() === today.toDateString();
}

export function isFutureDate(date?: Date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate > today;
}

export function isPastDate(date?: Date) {
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(date);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate < today;
}

export function isSameDay(date1?: Date, date2?: Date) {
  if (!date1 || !date2) return false;
  const checkDate1 = new Date(date1);
  checkDate1.setHours(0, 0, 0, 0);
  const checkDate2 = new Date(date2);
  checkDate2.setHours(0, 0, 0, 0);
  return checkDate1.toDateString() === checkDate2.toDateString();
}

export function getDayIndex(date?: Date) {
  if (!date) return 0;
  return (date?.getDay() + 6) % 7;
}
