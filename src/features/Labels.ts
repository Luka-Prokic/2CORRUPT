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

export const useBodyParts = () => {
  const { t } = useTranslation();
  return [
    t("body-parts.upper-chest"),
    t("body-parts.mid-chest"),
    t("body-parts.lower-chest"),
    t("body-parts.front-delts"),
    t("body-parts.side-delts"),
    t("body-parts.rear-delts"),
    t("body-parts.lats"),
    t("body-parts.lower-back"),
    t("body-parts.upper-traps"),
    t("body-parts.mid-traps"),
    t("body-parts.biceps"),
    t("body-parts.brachialis"),
    t("body-parts.triceps"),
    t("body-parts.forearms"),
    t("body-parts.quads"),
    t("body-parts.hamstrings"),
    t("body-parts.glutes"),
    t("body-parts.calves"),
    t("body-parts.adductors"),
    t("body-parts.abs"),
    t("body-parts.obliques"),
    t("body-parts.hip-flexors"),
    t("body-parts.grip"),
    t("body-parts.full-body"),
  ];
};

export const useEquipment = () => {
  const { t } = useTranslation();
  return [
    t("equipment.all"),
    t("equipment.barbell"),
    t("equipment.dumbbells"),
    t("equipment.bench"),
    t("equipment.rack"),
    t("equipment.cable"),
    t("equipment.bodyweight"),
    t("equipment.dip-bar"),
    t("equipment.pull-up-bar"),
    t("equipment.machine"),
    t("equipment.box"),
    t("equipment.kettlebell"),
    t("equipment.ab-wheel"),
    t("equipment.preacher-bench"),
    t("equipment.other"),
  ];
};

export const useCategory = () => {
  const { t } = useTranslation();
  return [
    t("categories.full-body"),
    t("categories.chest"),
    t("categories.shoulders"),
    t("categories.back"),
    t("categories.legs"),
    t("categories.core"),
    t("categories.arms"),
  ];
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
  "Sunday",
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
  "December",
];
export const BODY_PARTS = [
  "All",
  "Chest",
  "Upper Chest",
  "Mid Chest",
  "Lower Chest",
  "Shoulders",
  "Front Delts",
  "Side Delts",
  "Rear Delts",
  "Back",
  "Lats",
  "Lower Back",
  "Upper Traps",
  "Mid Traps",
  "Arms",
  "Biceps",
  "Brachialis",
  "Triceps",
  "Forearms",
  "Legs",
  "Quads",
  "Hamstrings",
  "Glutes",
  "Calves",
  "Adductors",
  "Core",
  "Abs",
  "Obliques",
  "Hip Flexors",
  "Full Body",
  "Grip",
];

export const EQUIPMENT = [
  "All",
  "Barbell",
  "Dumbbells",
  "Bench",
  "Rack",
  "Cable",
  "Bodyweight",
  "Dip Bar",
  "Pull-Up Bar",
  "Machine",
  "Box",
  "Kettlebell",
  "Ab Wheel",
  "Preacher Bench",
  "Other",
];

export const CATEGORIES = [
  "Full Body",
  "Chest",
  "Shoulders",
  "Back",
  "Legs",
  "Core",
  "Arms",
];
