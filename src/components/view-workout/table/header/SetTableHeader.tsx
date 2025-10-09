import { View, Text } from "react-native";
import { useSettingsStore } from "../../../../stores/settingsStore";
import { useTranslation } from "react-i18next";

export function SetTableHeader() {
  const { theme } = useSettingsStore();
  const { t } = useTranslation();
  return (
    <View
      style={{
        flexDirection: "row",
        position: "absolute",
        height: 34,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: "center",
      }}
    >
      {["SET", "REPS", "KG", "DONE"].map((label) => (
        <Text
          key={label}
          style={{
            fontSize: 16,
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
            color: theme.grayText,
          }}
        >
          {t(`workout-view.${label.toLowerCase()}`).toUpperCase()}
        </Text>
      ))}
    </View>
  );
}
