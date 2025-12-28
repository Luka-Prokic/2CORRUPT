import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useFormatFriendlyDate = () => {
  const { t } = useTranslation();

  return useCallback(
    (date: Date): string => {
      if (!date) return "-";
      const today = new Date();

      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      const isTodayDate = date.toDateString() === today.toDateString();
      const isYesterday = date.toDateString() === yesterday.toDateString();

      const day = date.getDate().toString().padStart(2, "0");
      const year = date?.getFullYear();

      const monthKey = date
        ?.toLocaleDateString("en-GB", { month: "long" })
        .toLowerCase();
      const monthShort = t(`calendar.months.short.${monthKey}`);

      const formatted = `${day} ${monthShort} ${year}`;

      if (isTodayDate) return `${t("calendar.today")}, ${formatted}`;
      if (isYesterday) return `${t("calendar.yesterday")}, ${formatted}`;

      const weekday = date
        .toLocaleDateString("en-GB", { weekday: "long" })
        .toLowerCase();

      return `${t(`calendar.days.long.${weekday}`)}, ${formatted}`;
    },
    [t]
  );
};
