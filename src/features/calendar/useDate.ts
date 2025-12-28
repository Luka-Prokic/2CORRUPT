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

export function subMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() - months);
  return result;
}

export function subYears(date: Date, years: number = 0): Date {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() - years);
  return result;
}

export function isAfter(date: Date, dateToCompare: Date): boolean {
  return date.getTime() > dateToCompare.getTime();
}

export function parseISO(isoString: string): Date {
  return new Date(isoString);
}
