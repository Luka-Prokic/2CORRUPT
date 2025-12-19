import { Ionicons } from "@expo/vector-icons";
import { useSettingsStore } from "../../../../stores/settings";
import { useTranslation } from "react-i18next";
import { BlurView } from "expo-blur";
import { IText } from "../../../ui/text/IText";

interface SplitDayHeaderProps {
  dayIndex: number;
}
export function SplitDayGridHeader({ dayIndex }: SplitDayHeaderProps) {
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
      <IText
        text={`${t("splits.day")} ${dayIndex + 1}`}
        color={theme.text}
        weight="bold"
        size={22}
      />
      <Ionicons name={"reorder-two"} size={34} color={theme.info} />
    </BlurView>
  );
}
