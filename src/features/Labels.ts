import { useTranslation } from "react-i18next";

// Calendar labels using i18n
export const useDayLabels = () => {
  const { t } = useTranslation();
  return t("calendar.days.short", { returnObjects: true }) as string[];
};

export const useDayNames = () => {
  const { t } = useTranslation();
  return t("calendar.days.long", { returnObjects: true }) as string[];
};

export const useMonthNames = () => {
  const { t } = useTranslation();
  return t("calendar.months.long", { returnObjects: true }) as string[];
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
  "Other"
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
