import { useTranslation } from 'react-i18next';

// Calendar labels using i18n
export const useDayLabels = () => {
  const { t } = useTranslation();
  return t('calendar.days.short', { returnObjects: true }) as string[];
};

export const useDayNames = () => {
  const { t } = useTranslation();
  return t('calendar.days.long', { returnObjects: true }) as string[];
};

export const useMonthNames = () => {
  const { t } = useTranslation();
  return t('calendar.months.long', { returnObjects: true }) as string[];
};

// Legacy exports for backward compatibility (will use default language)
export const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

export const DAY_NAMES = [
  "Monday",
  "Tuesday", 
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const MONTH_NAMES = [
  "January",
  "February", 
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
