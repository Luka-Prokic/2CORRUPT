import { useTranslation } from "react-i18next";

// Calendar labels using i18n
export const useDayLabels = () => {
  const { t } = useTranslation();
  return [
    t("calendar.days.short.monday"),
    t("calendar.days.short.tuesday"),
    t("calendar.days.short.wednesday"),
    t("calendar.days.short.thursday"),
    t("calendar.days.short.friday"),
    t("calendar.days.short.saturday"),
    t("calendar.days.short.sunday"),
  ];
};

export const useDayNames = () => {
  const { t } = useTranslation();
  return [
    t("calendar.days.long.monday"),
    t("calendar.days.long.tuesday"),
    t("calendar.days.long.wednesday"),
    t("calendar.days.long.thursday"),
    t("calendar.days.long.friday"),
    t("calendar.days.long.saturday"),
    t("calendar.days.long.sunday"),
  ];
};

export const useMonthNames = () => {
  const { t } = useTranslation();
  return [
    t("calendar.months.long.january"),
    t("calendar.months.long.february"),
    t("calendar.months.long.march"),
    t("calendar.months.long.april"),
    t("calendar.months.long.may"),
    t("calendar.months.long.june"),
    t("calendar.months.long.july"),
    t("calendar.months.long.august"),
    t("calendar.months.long.september"),
    t("calendar.months.long.october"),
    t("calendar.months.long.november"),
    t("calendar.months.long.december"),
  ];
};

export const useMonthSlugs = () => {
  const { t } = useTranslation();
  return [
    t("calendar.months.short.january"),
    t("calendar.months.short.february"),
    t("calendar.months.short.march"),
    t("calendar.months.short.april"),
    t("calendar.months.short.may"),
    t("calendar.months.short.june"),
    t("calendar.months.short.july"),
    t("calendar.months.short.august"),
    t("calendar.months.short.september"),
    t("calendar.months.short.october"),
    t("calendar.months.short.november"),
    t("calendar.months.short.december"),
  ];
};
