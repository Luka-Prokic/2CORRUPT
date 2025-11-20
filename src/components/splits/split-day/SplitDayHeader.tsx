import { Text } from "react-native";
import { useSettingsStore } from "../../../stores/settings";
import { useTranslation } from "react-i18next";
import { BlurView } from "expo-blur";

interface SplitDayHeaderProps {
  dayIndex: number;
}
export function SplitDayHeader({ dayIndex }: SplitDayHeaderProps) {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  return (
    <BlurView
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: 44,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        {t("splits.day")} {dayIndex + 1}
      </Text>
    </BlurView>
  );
}
